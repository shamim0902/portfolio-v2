import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import portfolioData from '../../../data/portfolio.json';
import { ProfileAvatar } from './ProfileAvatar';

interface OwnedProject {
  name: string;
  url: string;
}

export function Footer() {
  const ownedProjects = (portfolioData as { ownedProjects?: OwnedProject[] }).ownedProjects ?? [];

  return (
    <footer className="relative border-t border-slate-200 bg-slate-50/65 px-4 py-8 backdrop-blur-sm dark:border-white/10 dark:bg-black/65 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <ProfileAvatar className="h-12 w-12 rounded-xl border border-cyan-500/30 object-cover" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{portfolioData.name}</h3>
                <p className="text-xs text-slate-600 dark:text-gray-400">{portfolioData.title}</p>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-gray-500">{portfolioData.location}</p>
              </div>
            </div>
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

          {/* Other Sites */}
          {ownedProjects.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Other Sites by Me</h4>
              <div className="space-y-1">
                {ownedProjects.slice(0, 5).map((project) => (
                  <a
                    key={project.url}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-slate-600 transition-colors hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400"
                  >
                    {project.name}
                  </a>
                ))}
              </div>
            </div>
          )}
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
