import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Move3D, MousePointer2 } from 'lucide-react';
import { getCountryMeta } from './countryMeta';

interface WorldMapProps {
  visitedCountries: string[];
  selectedCountry: string | null;
  onCountrySelect: (country: string | null) => void;
}

interface Marker {
  country: string;
  lat: number;
  lon: number;
  continent: string;
  anchorCity: string;
}

interface MarkerPosition {
  country: string;
  x: number;
  y: number;
  radius: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const hashCountry = (country: string) =>
  country.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

const fallbackMarker = (country: string): Marker => {
  const hash = hashCountry(country);
  const lat = (hash % 120) - 60;
  const lon = ((hash * 17) % 360) - 180;

  return {
    country,
    lat,
    lon,
    continent: 'Unknown',
    anchorCity: 'N/A',
  };
};

export default function WorldMap({ visitedCountries, selectedCountry, onCountrySelect }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerPositionsRef = useRef<MarkerPosition[]>([]);
  const rotationRef = useRef({ lambda: -15, phi: -12 });
  const targetRotationRef = useRef({ lambda: -15, phi: -12 });
  const hoveredCountryRef = useRef<string | null>(null);
  const isDraggingRef = useRef(false);
  const dragStateRef = useRef({ x: 0, y: 0, lambda: 0, phi: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const markers = useMemo<Marker[]>(
    () =>
      visitedCountries.map((country) => {
        const meta = getCountryMeta(country);
        if (!meta) return fallbackMarker(country);

        return {
          country,
          lat: meta.lat,
          lon: meta.lon,
          continent: meta.continent,
          anchorCity: meta.anchorCity,
        };
      }),
    [visitedCountries]
  );

  useEffect(() => {
    if (!selectedCountry) return;

    const marker = markers.find((item) => item.country === selectedCountry);
    if (!marker) return;

    targetRotationRef.current = {
      lambda: -marker.lon,
      phi: clamp(-marker.lat, -38, 38),
    };
  }, [markers, selectedCountry]);

  useEffect(() => {
    hoveredCountryRef.current = hoveredCountry;
  }, [hoveredCountry]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const graticule = d3.geoGraticule10();

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
    };

    resize();

    const render = (time: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.43;

      if (!isDraggingRef.current) {
        if (selectedCountry) {
          rotationRef.current.lambda += (targetRotationRef.current.lambda - rotationRef.current.lambda) * 0.06;
          rotationRef.current.phi += (targetRotationRef.current.phi - rotationRef.current.phi) * 0.06;
        } else {
          rotationRef.current.lambda += 0.12;
          rotationRef.current.phi += (0 - rotationRef.current.phi) * 0.02;
        }
      }

      const projection = d3
        .geoOrthographic()
        .translate([centerX, centerY])
        .scale(radius)
        .clipAngle(90)
        .precision(0.5)
        .rotate([rotationRef.current.lambda, rotationRef.current.phi]);

      const path = d3.geoPath(projection, context);

      context.clearRect(0, 0, width, height);

      const globeGradient = context.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.18,
        centerX,
        centerY,
        radius
      );
      globeGradient.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
      globeGradient.addColorStop(0.45, 'rgba(8, 145, 178, 0.17)');
      globeGradient.addColorStop(1, 'rgba(2, 6, 23, 0.06)');

      context.beginPath();
      path({ type: 'Sphere' } as any);
      context.fillStyle = globeGradient;
      context.fill();

      context.beginPath();
      path(graticule as any);
      context.strokeStyle = 'rgba(100, 116, 139, 0.28)';
      context.lineWidth = 0.7;
      context.stroke();

      context.beginPath();
      path({ type: 'Sphere' } as any);
      context.strokeStyle = 'rgba(34, 211, 238, 0.35)';
      context.lineWidth = 1.4;
      context.stroke();

      const markerPositions: MarkerPosition[] = [];
      const pulse = (Math.sin(time * 0.003) + 1) / 2;

      markers.forEach((marker, index) => {
        const projected = projection([marker.lon, marker.lat]);
        if (!projected) return;

        const [x, y] = projected;
        const isSelected = marker.country === selectedCountry;
        const isHovered = marker.country === hoveredCountryRef.current;
        const baseRadius = isSelected ? 6 : isHovered ? 5 : 4;
        const auraRadius = baseRadius + 8 + pulse * 4 + (index % 3);

        context.beginPath();
        context.arc(x, y, auraRadius, 0, Math.PI * 2);
        context.fillStyle = isSelected
          ? 'rgba(34, 211, 238, 0.24)'
          : isHovered
            ? 'rgba(34, 211, 238, 0.2)'
            : 'rgba(6, 182, 212, 0.11)';
        context.fill();

        context.beginPath();
        context.arc(x, y, baseRadius, 0, Math.PI * 2);
        context.fillStyle = isSelected ? '#22d3ee' : isHovered ? '#67e8f9' : '#06b6d4';
        context.fill();
        context.strokeStyle = isSelected ? 'rgba(255,255,255,0.95)' : 'rgba(224,242,254,0.8)';
        context.lineWidth = 1.3;
        context.stroke();

        if (isSelected || isHovered) {
          context.font = '600 12px ui-sans-serif, system-ui, -apple-system, Segoe UI';
          context.fillStyle = '#e2f3ff';
          context.textAlign = 'center';
          context.fillText(marker.country, x, y - 14);
        }

        markerPositions.push({
          country: marker.country,
          x,
          y,
          radius: auraRadius,
        });
      });

      markerPositionsRef.current = markerPositions;
      animationFrameRef.current = window.requestAnimationFrame(render);
    };

    const getPointerPosition = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const detectClosestCountry = (x: number, y: number) => {
      for (const marker of markerPositionsRef.current) {
        const distance = Math.hypot(marker.x - x, marker.y - y);
        if (distance <= marker.radius) return marker.country;
      }
      return null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      dragStateRef.current = {
        x: event.clientX,
        y: event.clientY,
        lambda: rotationRef.current.lambda,
        phi: rotationRef.current.phi,
      };
      canvas.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isDraggingRef.current) {
        const deltaX = event.clientX - dragStateRef.current.x;
        const deltaY = event.clientY - dragStateRef.current.y;

        rotationRef.current.lambda = dragStateRef.current.lambda + deltaX * 0.25;
        rotationRef.current.phi = clamp(dragStateRef.current.phi + deltaY * 0.25, -50, 50);
        targetRotationRef.current = { ...rotationRef.current };
        return;
      }

      const { x, y } = getPointerPosition(event);
      const country = detectClosestCountry(x, y);
      setHoveredCountry((current) => (current === country ? current : country));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      canvas.releasePointerCapture(event.pointerId);
    };

    const handlePointerLeave = () => {
      setHoveredCountry(null);
      isDraggingRef.current = false;
    };

    const handleClick = (event: PointerEvent) => {
      const { x, y } = getPointerPosition(event);
      const country = detectClosestCountry(x, y);
      if (!country) return;

      onCountrySelect(country === selectedCountry ? null : country);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('click', handleClick);

    resizeObserverRef.current = new ResizeObserver(resize);
    resizeObserverRef.current.observe(container);
    animationFrameRef.current = window.requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [markers, onCountrySelect, selectedCountry]);

  const focusedCountry = selectedCountry ?? hoveredCountry;
  const focusedMarker = focusedCountry ? markers.find((item) => item.country === focusedCountry) : null;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.14),transparent_42%)]"
    >
      <canvas ref={canvasRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

      <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/20 bg-slate-900/60 px-2.5 py-1.5 text-[11px] text-slate-100 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Move3D size={12} />
          <span>Drag to rotate</span>
        </div>
        <div className="mt-0.5 hidden items-center gap-2 text-[10px] text-cyan-200/90 sm:flex">
          <MousePointer2 size={12} />
          <span>Click beacon to focus</span>
        </div>
      </div>

      {focusedMarker && (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/20 bg-slate-900/65 px-2.5 py-2 text-[11px] text-slate-100 backdrop-blur-xl">
          <p className="text-xs font-semibold text-cyan-300">{focusedMarker.country}</p>
          <p className="text-[11px] text-slate-200">{focusedMarker.anchorCity}</p>
          <p className="text-[10px] text-slate-300">{focusedMarker.continent}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">
            {focusedMarker.lat.toFixed(2)}°, {focusedMarker.lon.toFixed(2)}°
          </p>
        </div>
      )}
    </div>
  );
}
