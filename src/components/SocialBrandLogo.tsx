import React, { useEffect, useState } from 'react';
import { SocialPlatformId } from '../data/socials';

export type SupportedBrandPlatform = SocialPlatformId | 'spotify' | 'deezer';

interface SocialBrandLogoProps {
  platform: SupportedBrandPlatform;
  className?: string;
  useBrandColor?: boolean;
}

const SIMPLE_ICONS_SLUGS: Record<SupportedBrandPlatform, string> = {
  youtube: 'youtube',
  facebook: 'facebook',
  soundcloud: 'soundcloud',
  spotify: 'spotify',
  deezer: 'deezer',
  instagram: 'instagram',
  tiktok: 'tiktok',
};

export const BRAND_HEX_COLORS: Record<SupportedBrandPlatform, string> = {
  youtube: '#FF0000',
  facebook: '#1877F2',
  soundcloud: '#FF5500',
  spotify: '#1DB954',
  deezer: '#A238FF',
  instagram: '#E4405F',
  tiktok: '#F5F1E8',
};

// Cache en mémoire des chemins SVG récupérés depuis Simple Icons CDN
const fetchedSvgPathCache = new Map<SupportedBrandPlatform, string>();

/**
 * Composant d'icône de plateforme sociale / musicale :
 * - Récupère dynamiquement le SVG officiel depuis le CDN Simple Icons (`https://cdn.simpleicons.org/<slug>`)
 *   et extrait son `<path>` vectoriel pour un rendu net et personnalisable.
 * - Bascule instantanément sur le tracé vectoriel officiel embarqué pendant le chargement ou hors-ligne.
 */
export const SocialBrandLogo: React.FC<SocialBrandLogoProps> = ({
  platform,
  className = 'w-5 h-5',
  useBrandColor = false,
}) => {
  const [fetchedPathD, setFetchedPathD] = useState<string | null>(
    () => fetchedSvgPathCache.get(platform) || null
  );

  useEffect(() => {
    if (fetchedSvgPathCache.has(platform)) {
      setFetchedPathD(fetchedSvgPathCache.get(platform)!);
      return;
    }

    let isMounted = true;
    const slug = SIMPLE_ICONS_SLUGS[platform];
    const controller = new AbortController();

    fetch(`https://cdn.simpleicons.org/${slug}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('SimpleIcons fetch failed');
        return res.text();
      })
      .then((svgText) => {
        const match = svgText.match(/<path[^>]*d="([^"]+)"/i);
        if (match && match[1]) {
          fetchedSvgPathCache.set(platform, match[1]);
          if (isMounted) {
            setFetchedPathD(match[1]);
          }
        }
      })
      .catch(() => {
        // Fallback silencieux sur les tracés vectoriels officiels embarqués
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [platform]);

  const colorStyle = useBrandColor
    ? { color: BRAND_HEX_COLORS[platform] }
    : undefined;

  if (fetchedPathD) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={colorStyle}
        className={className}
        aria-hidden="true"
      >
        <path d={fetchedPathD} />
      </svg>
    );
  }

  switch (platform) {
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );

    case 'facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );

    case 'soundcloud':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.049-.1-.084-.1zm1.896-1.41c-.061 0-.11.049-.12.11l-.21 2.553.21 2.497c.01.061.059.11.12.11.06 0 .109-.049.119-.11l.238-2.497-.238-2.553c-.01-.061-.059-.11-.119-.11zm1.933-.879c-.073 0-.132.06-.142.134l-.19 3.428.19 3.314c.01.074.069.134.142.134.072 0 .131-.06.142-.134l.214-3.314-.214-3.428c-.011-.074-.07-.134-.142-.134zm1.958-.72c-.084 0-.152.068-.162.154l-.17 4.148.17 3.997c.01.086.078.154.162.154.083 0 .152-.068.162-.154l.191-3.997-.191-4.148c-.01-.086-.079-.154-.162-.154zm1.988-.478c-.096 0-.174.078-.184.176l-.149 4.626.149 4.442c.01.098.088.176.184.176.095 0 .173-.078.183-.176l.168-4.442-.168-4.626c-.01-.098-.088-.176-.183-.176zm2.022-.941c-.109 0-.197.088-.207.199l-.128 5.567.128 5.318c.01.111.098.199.207.199.108 0 .196-.088.206-.199l.144-5.318-.144-5.567c-.01-.111-.098-.199-.206-.199zm9.923 3.748c-.419 0-.819.084-1.186.235-.245-2.762-2.559-4.93-5.382-4.93-1.06 0-2.05.308-2.887.837-.145.091-.182.185-.182.342v9.946c0 .192.154.349.345.352h9.292c1.714 0 3.105-1.391 3.105-3.105s-1.391-3.677-3.105-3.677z" />
        </svg>
      );

    case 'spotify':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );

    case 'deezer':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027h-5.19zm6.271 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03h-5.19zm6.271 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z" />
        </svg>
      );

    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );

    case 'tiktok':
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={colorStyle}
          className={className}
          aria-hidden="true"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
  }
};
