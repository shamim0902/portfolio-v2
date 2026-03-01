import { lazy, Suspense, useState, useEffect } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Navigation } from '../components/shared/Navigation';
import { Footer } from '../components/shared/Footer';
import { CommandPalette } from '../components/command/CommandPalette';
import { Toaster } from '../components/ui/sonner';
import { SceneBackdrop } from '../components/effects/SceneBackdrop';

// Lazy load heavy section
const CountriesSection = lazy(() => import('../components/sections/CountriesSection').then(module => ({ default: module.CountriesSection })));

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_COOKIE_NAME = 'portfolio_theme';

const isThemeMode = (value: string | null): value is ThemeMode => value === 'light' || value === 'dark';

const getThemeFromCookie = (): ThemeMode | null => {
  if (typeof document === 'undefined') return null;

  const cookieValue = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${THEME_COOKIE_NAME}=`))
    ?.split('=')[1];

  return isThemeMode(cookieValue ?? null) ? cookieValue : null;
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';

  const localValue = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeMode(localValue)) return localValue;

  const cookieValue = getThemeFromCookie();
  if (cookieValue) return cookieValue;

  return 'light';
};

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [isDark, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="site-shell min-h-screen">
      <SceneBackdrop />
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        
        <Suspense fallback={
          <div className="py-32 text-center">
            <div className="text-slate-600 dark:text-gray-400">Loading travel section...</div>
          </div>
        }>
          <CountriesSection />
        </Suspense>
        
        <ContactSection />
      </main>

      <Footer />
      <CommandPalette isDark={isDark} toggleTheme={toggleTheme} />
      <Toaster position="bottom-right" theme={isDark ? 'dark' : 'light'} />
    </div>
  );
}
