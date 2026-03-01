import { ImgHTMLAttributes, useMemo, useState } from 'react';
import portfolioData from '../../../data/portfolio.json';

interface ProfileAvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  sources?: Array<string | null | undefined>;
}

type BrandingConfig = {
  profileImage?: string;
  profileFallback?: string;
};

const branding = (portfolioData as { branding?: BrandingConfig }).branding;

const defaultSources = [
  branding?.profileImage,
  'https://github.com/shamim0902.png',
  branding?.profileFallback,
];

const getInitials = (value: string) =>
  value
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function ProfileAvatar({ sources, className, alt, ...rest }: ProfileAvatarProps) {
  const normalizedSources = useMemo(
    () =>
      Array.from(
        new Set([...(sources ?? []), ...defaultSources].filter((source): source is string => Boolean(source)))
      ),
    [sources]
  );
  const [sourceIndex, setSourceIndex] = useState(0);

  const activeSource = normalizedSources[sourceIndex];

  if (!activeSource) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-cyan-500/20 font-semibold text-cyan-700 dark:text-cyan-300 ${className ?? ''}`}
      >
        {getInitials(portfolioData.name)}
      </div>
    );
  }

  return (
    <img
      src={activeSource}
      alt={alt ?? `${portfolioData.name} profile photo`}
      className={className}
      onError={() => setSourceIndex((index) => index + 1)}
      {...rest}
    />
  );
}
