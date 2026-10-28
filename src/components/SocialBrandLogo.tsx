import React from 'react';
import {
  Facebook,
  Instagram,
  Music2,
  Radio,
  Youtube,
} from 'lucide-react';
import {
  FaDeezer,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa6';
import { SocialPlatformId } from '../data/socials';

export type SupportedBrandPlatform = SocialPlatformId | 'spotify' | 'deezer';

interface SocialBrandLogoProps {
  platform: SupportedBrandPlatform;
  className?: string;
}

/**
 * Composant d'icônes officielles des réseaux sociaux et plateformes musicales
 * combinant les bibliothèques d'icônes (react-icons/fa6 & lucide-react)
 * et stylisé avec le thème orange accent (#FF5A1F / theme-accent-text).
 */
export const SocialBrandLogo: React.FC<SocialBrandLogoProps> = ({
  platform,
  className = 'w-5 h-5',
}) => {
  switch (platform) {
    case 'youtube':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaYoutube className={className} />
          <Youtube className="sr-only" />
        </span>
      );

    case 'facebook':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaFacebook className={className} />
          <Facebook className="sr-only" />
        </span>
      );

    case 'soundcloud':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaSoundcloud className={className} />
          <Radio className="sr-only" />
        </span>
      );

    case 'instagram':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaInstagram className={className} />
          <Instagram className="sr-only" />
        </span>
      );

    case 'spotify':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaSpotify className={className} />
          <Music2 className="sr-only" />
        </span>
      );

    case 'deezer':
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaDeezer className={className} />
          <Music2 className="sr-only" />
        </span>
      );

    case 'tiktok':
    default:
      return (
        <span className="inline-flex items-center justify-center" aria-hidden="true">
          <FaTiktok className={className} />
        </span>
      );
  }
};
