# Architecture Documentation

## Technical Stack

### Core Framework
- **React 18.3.1** - Component-based UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite 6.x** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Motion (Framer Motion)** - Declarative animations
- **GSAP + ScrollTrigger** - Advanced scroll animations

### 3D Graphics
- **Three.js** - WebGL 3D library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Data Visualization
- **D3.js** - Data-driven visualizations

### Routing & State
- **React Router v7** - Client-side routing
- **React Hooks** - Local state management
- **next-themes** - Theme management

### UI Components
- **cmdk** - Command palette
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

## Architecture Decisions

### Component Structure

```
components/
├── command/         # Command palette (Cmd+K)
├── sections/        # Major page sections
│   ├── HeroSection
│   ├── AboutSection
│   ├── ProjectsSection
│   ├── CountriesSection
│   └── ContactSection
├── shared/          # Reusable UI components
│   ├── Navigation
│   ├── Footer
│   ├── MagneticButton
│   └── LoadingSkeleton
├── three/           # 3D components
│   └── TechOrb
├── visualizations/  # Data viz components
│   └── WorldMap
└── ui/              # Base UI library (Radix)
```

### Data Flow

**Single Source of Truth**: `/src/data/portfolio.json`

All content is driven from this JSON file, making updates simple and centralized.

```json
{
  "name": "...",
  "title": "...",
  "projects": [...],
  "skills": [...],
  "countriesVisited": [...]
}
```

### Routing Strategy

Using React Router's data mode pattern for optimal performance:

```typescript
// routes.tsx
createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/resume", Component: Resume },
  { path: "*", Component: NotFound }
])
```

### Performance Optimizations

#### Code Splitting
```typescript
// Lazy load heavy components
const CountriesSection = lazy(() => 
  import('./components/sections/CountriesSection')
);
```

#### Suspense Boundaries
```tsx
<Suspense fallback={<LoadingSkeleton />}>
  <CountriesSection />
</Suspense>
```

#### 3D Optimization
- DPR limited to 2 max
- Automatic pause when tab hidden (browser default)
- Graceful fallback for unsupported browsers
- Reduced motion preference detection

#### Animation Performance
- GSAP for complex animations (native performance)
- Motion for declarative React animations
- ScrollTrigger cleanup on unmount
- Respect `prefers-reduced-motion`

### Animation System

#### GSAP ScrollTrigger
Used for scroll-based reveals and parallax effects:

```typescript
gsap.fromTo(element,
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  }
);
```

#### Motion
Used for component-level animations:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
/>
```

### Accessibility Features

#### Keyboard Navigation
- Full keyboard support for all interactive elements
- Focus visible states
- Tab order optimization

#### Screen Readers
- Semantic HTML (nav, main, section, footer)
- ARIA labels on icon buttons
- Skip-to-content link
- Alt text for images

#### Motion Preferences
```typescript
const prefersReducedMotion = 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Animations disabled when user prefers reduced motion.

#### Focus Management
- Trap focus in modals
- Restore focus on modal close
- Visible focus indicators

### 3D Implementation

#### Tech Orb Component
```typescript
<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
  <Suspense fallback={null}>
    <TechOrb mousePosition={mousePosition} />
  </Suspense>
</Canvas>
```

Features:
- Mouse-reactive rotation
- Particle system (1000 particles)
- Smooth idle animation
- Performance-optimized materials
- Graceful WebGL fallback

### Responsive Design

#### Breakpoints
Following Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

#### Mobile-First Approach
All styles start mobile and scale up:

```tsx
className="text-4xl md:text-6xl lg:text-8xl"
```

### Theme System

Dark-first design with light mode option:

```typescript
const [isDark, setIsDark] = useState(true);
document.documentElement.classList.toggle('light');
```

CSS variables for theming in `theme.css`.

### Build & Deployment

#### Build Process
```bash
npm run build
```

Output: Optimized static files in `/dist`

#### Optimization Features
- Tree shaking
- Code splitting
- Asset optimization
- CSS purging
- Minification

#### Deployment Targets
- **Netlify** - Zero-config deployment
- **Vercel** - Optimized for React
- **GitHub Pages** - Static hosting
- **Any static host** - Standard HTML/CSS/JS

### Print Optimization

Resume page includes print-specific styles:

```css
@media print {
  @page { size: A4; margin: 1cm; }
  .no-print { display: none; }
}
```

Results in perfect A4 PDF exports.

### Error Boundaries

404 handling with custom component:

```tsx
{
  path: "*",
  Component: NotFound
}
```

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features
- WebGL support recommended
- Fallbacks for older browsers

### Development Experience

#### Hot Module Replacement
Vite provides instant HMR during development.

#### Type Safety
TypeScript catches errors at compile time.

#### Code Organization
- Logical component grouping
- Clear separation of concerns
- Reusable utilities

## File Size Budget

Target metrics:
- Initial JS bundle: < 200KB gzipped
- Initial CSS: < 50KB gzipped
- Time to Interactive: < 3s on 3G
- Lighthouse Score: 90+ (desktop)

## Future Enhancements

Potential additions:
- Blog integration
- CMS integration for content
- Analytics integration
- Progressive Web App features
- Image optimization with next/image patterns
- Internationalization (i18n)

---

This architecture prioritizes:
1. **Performance** - Fast load times, optimized assets
2. **Accessibility** - WCAG 2.1 AA compliance
3. **Maintainability** - Clean code, clear structure
4. **Scalability** - Easy to extend and modify
5. **User Experience** - Smooth, delightful interactions
