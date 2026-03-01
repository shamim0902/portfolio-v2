import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  Building2,
  ExternalLink,
  FileText,
  GitFork,
  Github,
  Link as LinkIcon,
  Loader2,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import { useSectionReveal } from '../../hooks/useSectionReveal';
import { useTiltCards } from '../../hooks/useTiltCards';
import { useDepthParallax } from '../../hooks/useDepthParallax';
import { ProfileAvatar } from '../shared/ProfileAvatar';

const GITHUB_PROFILE_API = 'https://api.github.com/users/shamim0902';
const GITHUB_CACHE_KEY = 'portfolio-github-cache-v1';
const GITHUB_CACHE_TTL_MS = 60 * 60 * 1000;

interface GitHubProfile {
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string | null;
  followers: number;
  following: number;
  html_url: string;
  login: string;
  name: string | null;
  public_gists: number;
  public_repos: number;
  repos_url: string;
  location: string | null;
  twitter_username: string | null;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  archived: boolean;
  fork: boolean;
  updated_at: string;
}

interface GitHubApiError {
  message?: string;
}

interface GitHubCachePayload {
  cachedAt: number;
  profile: GitHubProfile;
  repos: GitHubRepo[];
}

const formatCount = (value: number) => value.toLocaleString('en-US');

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const normalizeWebsiteUrl = (value: string): string => {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `https://${value}`;
};

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useSectionReveal(sectionRef, '.reveal-item');
  useTiltCards(sectionRef);
  useDepthParallax(sectionRef);

  useEffect(() => {
    const controller = new AbortController();

    const isCacheValid = (value: GitHubCachePayload) => Date.now() - value.cachedAt < GITHUB_CACHE_TTL_MS;

    const readCache = (): GitHubCachePayload | null => {
      if (typeof window === 'undefined') return null;

      try {
        const raw = window.localStorage.getItem(GITHUB_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as GitHubCachePayload;
        if (!parsed?.cachedAt || !parsed?.profile || !Array.isArray(parsed?.repos)) return null;
        return parsed;
      } catch {
        return null;
      }
    };

    const writeCache = (payload: GitHubCachePayload) => {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(payload));
      } catch {
        // Ignore quota/private mode failures.
      }
    };

    const loadGitHubData = async () => {
      const bypassCache = reloadKey > 0;
      const cached = readCache();

      if (!bypassCache && cached && isCacheValid(cached)) {
        setProfile(cached.profile);
        setRepos(cached.repos);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const profileResponse = await fetch(GITHUB_PROFILE_API, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });

        if (!profileResponse.ok) {
          const apiError = (await profileResponse.json().catch(() => null)) as GitHubApiError | null;
          throw new Error(apiError?.message ?? `GitHub profile request failed (${profileResponse.status})`);
        }

        const profileData = (await profileResponse.json()) as GitHubProfile;

        const reposResponse = await fetch(`${profileData.repos_url}?per_page=100&sort=updated`, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });

        if (!reposResponse.ok) {
          const apiError = (await reposResponse.json().catch(() => null)) as GitHubApiError | null;
          throw new Error(apiError?.message ?? `GitHub repositories request failed (${reposResponse.status})`);
        }

        const reposData = (await reposResponse.json()) as GitHubRepo[];
        const normalizedRepos = reposData.filter((repo) => !repo.archived && !repo.fork);
        setProfile(profileData);
        setRepos(normalizedRepos);
        writeCache({
          cachedAt: Date.now(),
          profile: profileData,
          repos: normalizedRepos,
        });
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') return;
        if (cached) {
          setProfile(cached.profile);
          setRepos(cached.repos);
          setError(null);
          setIsLoading(false);
          return;
        }

        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load GitHub data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubData();

    return () => controller.abort();
  }, [reloadKey]);

  const highlightedRepos = useMemo(() => {
    return repos
      .slice()
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 6);
  }, [repos]);

  const totalStars = useMemo(
    () => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [repos]
  );

  const totalForks = useMemo(
    () => repos.reduce((sum, repo) => sum + repo.forks_count, 0),
    [repos]
  );

  const topLanguages = useMemo(() => {
    const counter = new Map<string, number>();

    repos.forEach((repo) => {
      if (!repo.language) return;
      counter.set(repo.language, (counter.get(repo.language) ?? 0) + 1);
    });

    return Array.from(counter.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [repos]);

  const profileWebsite = profile?.blog ? normalizeWebsiteUrl(profile.blog) : '';
  const profileName = profile?.name || profile?.login || 'GitHub Profile';

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-shell mesh-aurora relative bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-20 dark:from-black dark:via-gray-900 dark:to-black md:py-24"
    >
      <div data-depth="1.2" data-depth-x="-16" className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-400/12 blur-[110px]" />
      <div data-depth="1.1" data-depth-x="18" className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-emerald-300/9 blur-[120px]" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-9 text-center reveal-item"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            GitHub
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Live GitHub Portfolio
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 dark:text-gray-400">
            Public profile data, repository highlights, and key stats are loaded directly from GitHub API.
          </p>
        </motion.div>

        {isLoading && (
          <div className="holo-card rounded-xl p-8 text-center reveal-item">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-cyan-500" />
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400">Loading GitHub profile and repositories...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-300/70 bg-red-50 p-6 text-center reveal-item dark:border-red-400/40 dark:bg-red-950/20">
            <AlertCircle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((prev) => prev + 1)}
              className="mt-4 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-500"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && profile && (
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="tilt-card prism-card holo-card rounded-xl p-4 reveal-item md:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <ProfileAvatar
                    sources={[profile.avatar_url]}
                    alt={`${profileName} avatar`}
                    className="h-16 w-16 rounded-xl border border-slate-300/70 object-cover dark:border-white/10 md:h-20 md:w-20"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{profileName}</h3>
                      <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        <Github size={14} />
                        @{profile.login}
                      </a>
                    </div>
                    {profile.bio && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">{profile.bio}</p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-gray-400">
                      {profile.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} />
                          {profile.location}
                        </span>
                      )}
                      {profile.company && (
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 size={13} />
                          {profile.company}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <FileText size={13} />
                        Updated {formatDate(profile.updated_at)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-cyan-400"
                      >
                        View Profile
                        <ExternalLink size={14} />
                      </a>

                      {profileWebsite && (
                        <a
                          href={profileWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        >
                          <LinkIcon size={14} />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Public Repos', value: profile.public_repos, icon: Github },
                  { label: 'Followers', value: profile.followers, icon: Users },
                  { label: 'Following', value: profile.following, icon: Users },
                  { label: 'Public Gists', value: profile.public_gists, icon: FileText },
                  { label: 'Total Stars', value: totalStars, icon: Star },
                  { label: 'Total Forks', value: totalForks, icon: GitFork },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="tilt-card prism-card holo-card rounded-xl p-3 reveal-item"
                  >
                    <item.icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{formatCount(item.value)}</p>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="prism-card holo-card rounded-xl p-4 reveal-item">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Repositories</h3>
                <a
                  href={`${profile.html_url}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  View all
                  <ExternalLink size={12} />
                </a>
              </div>

              {topLanguages.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {topLanguages.map(([language, count]) => (
                    <span
                      key={language}
                      className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-700 dark:text-cyan-400"
                    >
                      {language} ({count})
                    </span>
                  ))}
                </div>
              )}

              {highlightedRepos.length > 0 ? (
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {highlightedRepos.map((repo) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="tilt-card prism-card reveal-item group rounded-lg border border-slate-300/70 bg-white p-3 transition-colors hover:border-cyan-500/40 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="line-clamp-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-400">
                          {repo.name}
                        </h4>
                        <ExternalLink size={13} className="mt-0.5 shrink-0 text-slate-500 dark:text-gray-400" />
                      </div>

                      <p className="mt-1.5 line-clamp-2 min-h-[32px] text-xs text-slate-600 dark:text-gray-300">
                        {repo.description || 'No description available for this repository.'}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-gray-400">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="inline-flex items-center gap-1">
                          <Star size={11} />
                          {formatCount(repo.stargazers_count)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork size={11} />
                          {formatCount(repo.forks_count)}
                        </span>
                        <span>Issues {formatCount(repo.open_issues_count)}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300/70 p-5 text-center text-sm text-slate-600 dark:border-white/10 dark:text-gray-400">
                  No public repositories available to highlight.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
