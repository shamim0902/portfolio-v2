import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import portfolioData from '../../../data/portfolio.json';

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-slate-50 px-4 py-8 dark:border-white/10 dark:bg-black md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 grid gap-5 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">{portfolioData.name}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">{portfolioData.title}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">{portfolioData.location}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <a href="#about" className="text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400">About</a>
              <a href="#projects" className="text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400">Projects</a>
              <a href="#travel" className="text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400">Travel</a>
              <a href="#contact" className="text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400">Contact</a>
              <a href="/resume" className="text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400">Resume</a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Connect</h4>
            <div className="flex gap-2">
              <a
                href={portfolioData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 bg-white p-1.5 text-slate-600 transition-all duration-300 hover:border-cyan-500/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={portfolioData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 bg-white p-1.5 text-slate-600 transition-all duration-300 hover:border-cyan-500/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={portfolioData.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-300 bg-white p-1.5 text-slate-600 transition-all duration-300 hover:border-cyan-500/30 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-4 text-center dark:border-white/10">
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-gray-400">
            Made with <Heart size={14} className="text-red-500 fill-current" /> by {portfolioData.name} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
