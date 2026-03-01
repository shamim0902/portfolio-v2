import { useRef } from 'react';
import { Mail, Phone, Github, Linkedin, Facebook, Twitter, Globe, Users, Send } from 'lucide-react';
import portfolioData from '../../../data/portfolio.json';
import { toast } from 'sonner';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';
import { useDepthParallax } from '../../hooks/useDepthParallax';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: portfolioData.links.github, color: 'hover:text-gray-300' },
  { icon: Linkedin, label: 'LinkedIn', url: portfolioData.links.linkedin, color: 'hover:text-blue-400' },
  { icon: Twitter, label: 'Twitter', url: portfolioData.links.twitter, color: 'hover:text-sky-400' },
  { icon: Facebook, label: 'Facebook', url: portfolioData.links.facebook, color: 'hover:text-blue-500' },
  { icon: Globe, label: 'Website', url: portfolioData.links.website, color: 'hover:text-cyan-400' },
  { icon: Users, label: 'Mentorship', url: portfolioData.links.mentorship, color: 'hover:text-emerald-400' },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, '.reveal-item', { once: true, start: 'top 92%' });
  useTiltCards(sectionRef);
  useDepthParallax(sectionRef);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-slide-exempt="true"
      className="section-shell mesh-aurora relative bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-16 dark:from-black dark:via-gray-900 dark:to-black md:py-20"
    >
      <div data-depth="1.2" className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div data-depth="1.1" data-depth-x="16" className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-emerald-300/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-6 text-center reveal-item">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            Contact
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Let's Work Together</h2>
        </div>

        <div className="holo-card rounded-xl p-4 backdrop-blur-xl reveal-item md:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Open to product engineering, architecture planning, and advisory collaboration.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(portfolioData.email, 'Email')}
                  className="neon-outline inline-flex items-center gap-1.5 rounded-lg border border-slate-300/70 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-cyan-400"
                >
                  <Mail size={13} />
                  {portfolioData.email}
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(portfolioData.phone, 'Phone')}
                  className="neon-outline inline-flex items-center gap-1.5 rounded-lg border border-slate-300/70 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-cyan-400"
                >
                  <Phone size={13} />
                  {portfolioData.phone}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${portfolioData.email}`}
              className="neon-outline inline-flex items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-cyan-400"
            >
              <Send size={13} />
              Email Me
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`neon-outline inline-flex items-center gap-1 rounded-md border border-slate-300/70 bg-white px-2.5 py-1.5 text-[11px] text-slate-600 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-gray-400 ${social.color}`}
              >
                <social.icon size={12} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
