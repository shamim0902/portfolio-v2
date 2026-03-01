import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router';
import portfolioData from '../../../data/portfolio.json';
import { ProfileAvatar } from './ProfileAvatar';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Travel', href: '#travel' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation({ isDark, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`mx-auto mt-3 max-w-7xl rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-300 md:px-6 ${
          hasScrolled
            ? 'border-cyan-400/30 bg-white/82 shadow-[0_14px_36px_rgba(8,145,178,0.16)] dark:bg-black/70'
            : 'border-slate-200 bg-white/72 dark:border-white/10 dark:bg-black/35'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition-colors"
          >
            <span className="logo-chip relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-cyan-500/35 bg-white/80 shadow-[0_8px_22px_rgba(6,182,212,0.22)] dark:bg-slate-900/70">
              <ProfileAvatar className="h-full w-full object-cover" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-700/90 dark:text-cyan-300/80">
                Portfolio
              </span>
              <span className="block text-sm font-semibold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
                {portfolioData.name}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link to="/resume" className="text-sm text-slate-700 transition-colors hover:text-slate-900 dark:text-gray-300 dark:hover:text-white">
              Resume
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-slate-300/70 bg-white/85 p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-slate-300/70 bg-white/85 p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-lg border border-slate-300/70 bg-white/85 p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 rounded-2xl border border-slate-200 bg-white/95 p-4 md:hidden dark:border-white/10 dark:bg-black/95"
          >
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 p-2 dark:border-white/10 dark:bg-white/5">
              <ProfileAvatar className="h-9 w-9 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{portfolioData.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-400">{portfolioData.title}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/resume"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Resume
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
