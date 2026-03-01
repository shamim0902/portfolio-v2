import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Mail, Phone, Github, Linkedin, Twitter, Globe, Moon, Sun, FileText, Compass, Briefcase, User } from 'lucide-react';
import portfolioData from '../../../data/portfolio.json';
import { toast } from 'sonner';

interface CommandPaletteProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function CommandPalette({ isDark, toggleTheme }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
    setOpen(false);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <>
      {/* Keyboard shortcut hint */}
      <div
        className="fixed bottom-8 right-4 z-40 md:right-8"
        style={{ right: 'max(1rem, env(safe-area-inset-right))' }}
      >
        <button
          onClick={() => setOpen(true)}
          className="prism-card flex items-center gap-2 rounded-lg border border-slate-300/70 bg-white/90 px-4 py-2 text-slate-700 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="text-sm">Command Menu</span>
          <kbd className="rounded bg-slate-100 px-2 py-1 text-xs font-mono dark:bg-white/10">
            {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
          </kbd>
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => scrollToSection('about')}>
              <User className="mr-2 h-4 w-4" />
              <span>Go to About</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection('projects')}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Go to Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection('travel')}>
              <Compass className="mr-2 h-4 w-4" />
              <span>Go to Travel</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection('contact')}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Go to Contact</span>
            </CommandItem>
            <CommandItem onSelect={() => window.location.href = '/resume'}>
              <FileText className="mr-2 h-4 w-4" />
              <span>View Resume</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Contact">
            <CommandItem onSelect={() => copyToClipboard(portfolioData.email, 'Email')}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Copy Email</span>
            </CommandItem>
            <CommandItem onSelect={() => copyToClipboard(portfolioData.phone, 'Phone')}>
              <Phone className="mr-2 h-4 w-4" />
              <span>Copy Phone</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Social Links">
            <CommandItem onSelect={() => openLink(portfolioData.links.github)}>
              <Github className="mr-2 h-4 w-4" />
              <span>Open GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => openLink(portfolioData.links.linkedin)}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Open LinkedIn</span>
            </CommandItem>
            <CommandItem onSelect={() => openLink(portfolioData.links.twitter)}>
              <Twitter className="mr-2 h-4 w-4" />
              <span>Open Twitter</span>
            </CommandItem>
            <CommandItem onSelect={() => openLink(portfolioData.links.website)}>
              <Globe className="mr-2 h-4 w-4" />
              <span>Open Website</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Preferences">
            <CommandItem onSelect={toggleTheme}>
              {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>Toggle {isDark ? 'Light' : 'Dark'} Mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
