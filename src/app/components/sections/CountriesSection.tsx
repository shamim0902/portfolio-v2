import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Compass, Globe2, Image as ImageIcon, Radar, Search, Sparkles, Target } from 'lucide-react';
import portfolioData from '../../../data/portfolio.json';
import { getCountryMeta } from '../visualizations/countryMeta';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';
import { useDepthParallax } from '../../hooks/useDepthParallax';

const WorldMap = lazy(() => import('../visualizations/WorldMap'));

interface TravelGalleryItem {
  id: string;
  title: string;
  location: string;
  src?: string;
  accent?: string;
}

interface TravelGalleryCardProps {
  item: TravelGalleryItem;
}

function TravelGalleryCard({ item }: TravelGalleryCardProps) {
  const [didFail, setDidFail] = useState(false);

  return (
    <article className="tilt-card prism-card relative overflow-hidden rounded-xl border border-slate-300/75 bg-white/80 p-2 dark:border-white/10 dark:bg-white/5">
      <div className="relative h-28 overflow-hidden rounded-lg">
        {!didFail && item.src ? (
          <img
            src={item.src}
            alt={`${item.title} - ${item.location}`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={() => setDidFail(true)}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                item.accent ??
                'linear-gradient(135deg, rgba(8,145,178,0.85), rgba(14,116,144,0.68), rgba(15,23,42,0.7))',
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.28),transparent_40%)]" />
      </div>
      <div className="mt-2 px-0.5">
        <p className="line-clamp-1 text-xs font-semibold text-slate-900 dark:text-white">{item.title}</p>
        <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-gray-400">{item.location}</p>
      </div>
    </article>
  );
}

export function CountriesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, '.reveal-item');
  useTiltCards(sectionRef);
  useDepthParallax(sectionRef);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const countries: string[] = portfolioData.countriesVisited;
  const galleryItems = useMemo(() => {
    const data = (portfolioData as { travelGallery?: TravelGalleryItem[] }).travelGallery;
    if (Array.isArray(data) && data.length > 0) return data.slice(0, 6);

    return countries.slice(0, 6).map((country, index) => ({
      id: `country-${country.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${country} moments`,
      location: country,
      accent:
        index % 2 === 0
          ? 'linear-gradient(135deg, rgba(6,182,212,0.82), rgba(14,116,144,0.6), rgba(2,6,23,0.7))'
          : 'linear-gradient(135deg, rgba(16,185,129,0.72), rgba(6,182,212,0.56), rgba(15,23,42,0.74))',
    }));
  }, [countries]);

  const filteredCountries = useMemo(
    () =>
      countries
        .filter((country) => country.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.localeCompare(b)),
    [countries, searchQuery]
  );

  const continentBreakdown = useMemo(() => {
    const counter = new Map<string, number>();

    countries.forEach((country) => {
      const continent = getCountryMeta(country)?.continent ?? 'Unknown';
      counter.set(continent, (counter.get(continent) ?? 0) + 1);
    });

    return Array.from(counter.entries()).sort((a, b) => b[1] - a[1]);
  }, [countries]);

  const selectedCountryMeta = selectedCountry ? getCountryMeta(selectedCountry) : null;
  const dominantContinent = continentBreakdown[0]?.[0] ?? 'N/A';

  return (
    <section
      ref={sectionRef}
      id="travel"
      className="section-shell mesh-aurora relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-20 dark:from-black dark:via-gray-900 dark:to-black md:py-24"
    >
      <div data-depth="1.3" data-depth-x="-16" className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-[120px]" />
      <div data-depth="1.1" data-depth-x="16" className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 text-center reveal-item"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            Travel Intelligence
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Global Footprint Radar
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 dark:text-gray-400">
            A live, rotatable globe highlighting every visited country with geographic targeting.
          </p>
        </motion.div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="tilt-card prism-card holo-card rounded-xl p-3 reveal-item">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
              <Globe2 size={14} />
              <span className="text-[11px] uppercase tracking-wider">Countries</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{countries.length}</p>
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-3 reveal-item">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
              <Compass size={14} />
              <span className="text-[11px] uppercase tracking-wider">Continents</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{continentBreakdown.length}</p>
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-3 reveal-item">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
              <Radar size={14} />
              <span className="text-[11px] uppercase tracking-wider">Primary Region</span>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{dominantContinent}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="tilt-card prism-card holo-card relative min-h-[420px] overflow-hidden rounded-2xl p-3 reveal-item md:min-h-[470px] lg:col-span-2">
            {isInView ? (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="text-slate-600 dark:text-gray-400">Booting globe renderer...</div>
                  </div>
                }
              >
                <WorldMap
                  visitedCountries={countries}
                  selectedCountry={selectedCountry}
                  onCountrySelect={setSelectedCountry}
                />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-600 dark:text-gray-400">
                Loading travel globe...
              </div>
            )}
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-4 reveal-item">
            <div className="mb-2 flex items-center gap-2">
              <Target size={16} className="text-cyan-700 dark:text-cyan-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Focused Country
              </h3>
            </div>

            {selectedCountry ? (
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedCountry}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">
                  {selectedCountryMeta?.anchorCity ?? 'Anchor city unavailable'} •{' '}
                  {selectedCountryMeta?.continent ?? 'Region unavailable'}
                </p>
                {selectedCountryMeta && (
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-500">
                    {selectedCountryMeta.lat.toFixed(2)}°, {selectedCountryMeta.lon.toFixed(2)}°
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-600 dark:text-gray-400">
                Select a country from the list or click a beacon on the globe.
              </p>
            )}
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-4 reveal-item">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-700 dark:text-cyan-400" />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Continent Coverage
              </h3>
            </div>
            <div className="space-y-2">
              {continentBreakdown.map(([continent, count]) => (
                <div key={continent}>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600 dark:text-gray-400">
                    <span>{continent}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
                      style={{ width: `${(count / countries.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-4 reveal-item lg:col-span-2">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Country Explorer
              </div>
              <div className="relative sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Filter countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-300/70 bg-white py-2 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-500 transition-colors focus:border-cyan-500/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="grid max-h-[240px] gap-1.5 overflow-y-auto pr-1 custom-scrollbar sm:grid-cols-2">
              {filteredCountries.map((country) => {
                const isActive = country === selectedCountry;
                const meta = getCountryMeta(country);

                return (
                  <button
                    key={country}
                    type="button"
                    onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}
                    className={`w-full rounded-lg border px-2.5 py-2 text-left transition-all ${
                      isActive
                        ? 'border-cyan-500 bg-cyan-500/15'
                        : 'border-slate-300/70 bg-white hover:border-cyan-400/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{country}</p>
                      <span className="text-[11px] text-slate-500 dark:text-gray-400">{meta?.continent ?? 'Unknown'}</span>
                    </div>
                    {meta?.anchorCity && (
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-gray-400">{meta.anchorCity}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="tilt-card prism-card holo-card rounded-xl p-4 reveal-item lg:col-span-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <ImageIcon size={14} className="text-cyan-700 dark:text-cyan-400" />
                Travel Gallery Vibes
              </div>
              <p className="text-[11px] text-slate-500 dark:text-gray-400">Add your own photos in `public/media/travel`</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <TravelGalleryCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
