import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router';

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
            ? 'border-cyan-400/30 bg-white/85 shadow-lg shadow-cyan-500/10 dark:bg-black/70'
            : 'border-slate-200 bg-white/70 dark:border-white/10 dark:bg-black/35'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            Portfolio
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
              className="rounded-lg border border-slate-300/70 bg-white p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-slate-300/70 bg-white p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-lg border border-slate-300/70 bg-white p-2 text-slate-700 transition-colors hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
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
