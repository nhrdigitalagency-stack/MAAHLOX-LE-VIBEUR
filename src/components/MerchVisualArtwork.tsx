import React from 'react';
import { MerchCategory } from '../data/products';

interface MerchVisualArtworkProps {
  category: MerchCategory;
  colorHex: string;
  editionCode: string;
  frontPrintText: string;
  subPrintText: string;
  conceptNotice: string;
  viewAngle?: 'front' | 'detail';
  className?: string;
}

/**
 * Rendu vectoriel d'étude studio pour les maquettes merchandising en mode Preview.
 * - Zéro image brisée (Zero-Broken-Image Policy).
 * - Adapte dynamiquement la teinte du textile selon la variante de couleur choisie.
 * - Affiche systématiquement le marquage « Concept — non disponible à la vente ».
 */
export const MerchVisualArtwork: React.FC<MerchVisualArtworkProps> = ({
  category,
  colorHex,
  editionCode,
  frontPrintText,
  subPrintText,
  conceptNotice,
  viewAngle = 'front',
  className = '',
}) => {
  const isLightFabric =
    colorHex.toLowerCase() === '#eae5d9' ||
    colorHex.toLowerCase() === '#ffffff' ||
    colorHex.toLowerCase() === '#f5f1e8';

  const printPrimaryColor = isLightFabric ? '#121110' : '#F5F1E8';
  const printAccentColor =
    colorHex.toLowerCase() === '#ff5a1f' ? '#080808' : '#FF5A1F';
  const strokeColor = isLightFabric
    ? 'rgba(18, 17, 16, 0.25)'
    : 'rgba(245, 241, 232, 0.22)';

  return (
    <div
      className={`relative w-full h-full bg-[#0B0B0A] text-[#F5F1E8] overflow-hidden flex flex-col justify-between p-4 select-none ${className}`}
    >
      {/* Halo de studio discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, rgba(255, 90, 31, 0.14) 0%, rgba(8, 8, 8, 0.92) 72%)',
        }}
      />

      {/* En-tête technique de maquette */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] font-poppins font-medium tracking-wider uppercase text-[#A8A29A]">
        <span>{editionCode}</span>
        <span className="text-[#DFFF00] bg-[#141414]/90 border border-[#F5F1E8]/15 px-2 py-0.5 truncate">
          {conceptNotice}
        </span>
      </div>

      {/* Silhouette produit vectorielle */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        {viewAngle === 'detail' ? (
          /* Vue zoomée sur le marquage poitrine / détail graphique */
          <div
            style={{
              backgroundColor: colorHex,
              borderColor: strokeColor,
            }}
            className="w-4/5 aspect-square border flex flex-col items-center justify-center p-6 shadow-2xl transition-colors duration-200"
          >
            <span
              style={{ color: printAccentColor }}
              className="font-poppins text-[10px] font-semibold tracking-[0.25em] uppercase mb-1"
            >
              STUDIO ARCHIVE · YAOUNDÉ
            </span>
            <span
              style={{ color: printPrimaryColor }}
              className="font-display text-3xl sm:text-4xl tracking-wider text-center leading-none"
            >
              {frontPrintText}
            </span>
            <div
              style={{ backgroundColor: printAccentColor }}
              className="h-[2px] w-12 my-2.5"
            />
            <span
              style={{ color: printPrimaryColor }}
              className="font-poppins text-[10px] tracking-widest uppercase opacity-80 text-center"
            >
              {subPrintText}
            </span>
          </div>
        ) : category === 'tshirt' ? (
          <svg
            viewBox="0 0 240 240"
            className="w-4/5 h-4/5 max-h-[220px] drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
            aria-hidden="true"
          >
            <path
              d="M74 36 L96 36 C102 48 138 48 144 36 L166 36 L212 72 L190 104 L166 88 L166 204 L74 204 L74 88 L50 104 L28 72 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <text
              x="120"
              y="108"
              textAnchor="middle"
              fill={printPrimaryColor}
              fontFamily="Anton, Impact, sans-serif"
              fontSize="22"
              letterSpacing="2"
            >
              {frontPrintText}
            </text>
            <rect
              x="92"
              y="116"
              width="56"
              height="2.5"
              fill={printAccentColor}
            />
            <text
              x="120"
              y="130"
              textAnchor="middle"
              fill={printPrimaryColor}
              fontFamily="Poppins, sans-serif"
              fontSize="7.5"
              fontWeight="600"
              letterSpacing="1.8"
            >
              {subPrintText}
            </text>
          </svg>
        ) : category === 'hoodie' ? (
          <svg
            viewBox="0 0 240 240"
            className="w-4/5 h-4/5 max-h-[220px] drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
            aria-hidden="true"
          >
            {/* Capuche + corps */}
            <path
              d="M88 42 C88 20 152 20 152 42 L172 48 L210 92 L188 188 L168 188 L168 102 L164 204 L76 204 L72 102 L72 188 L52 188 L30 92 L68 48 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Poche kangourou */}
            <path
              d="M88 156 L152 156 L160 192 L80 192 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            <text
              x="120"
              y="106"
              textAnchor="middle"
              fill={printPrimaryColor}
              fontFamily="Anton, Impact, sans-serif"
              fontSize="20"
              letterSpacing="2"
            >
              {frontPrintText}
            </text>
            <text
              x="120"
              y="122"
              textAnchor="middle"
              fill={printAccentColor}
              fontFamily="Poppins, sans-serif"
              fontSize="7"
              fontWeight="600"
              letterSpacing="1.6"
            >
              {subPrintText}
            </text>
          </svg>
        ) : category === 'cap' ? (
          <svg
            viewBox="0 0 240 240"
            className="w-4/5 h-4/5 max-h-[210px] drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
            aria-hidden="true"
          >
            {/* Calotte */}
            <path
              d="M52 138 C52 76 188 76 188 138 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Visière */}
            <path
              d="M44 138 L196 138 C210 154 182 164 120 162 C58 164 30 154 44 138 Z"
              fill={colorHex}
              stroke={printAccentColor}
              strokeWidth="2"
            />
            <text
              x="120"
              y="122"
              textAnchor="middle"
              fill={printPrimaryColor}
              fontFamily="Anton, Impact, sans-serif"
              fontSize="19"
              letterSpacing="2"
            >
              {frontPrintText}
            </text>
          </svg>
        ) : (
          /* Poster encadré */
          <div className="w-3/4 aspect-[3/4] max-h-[215px] bg-[#121212] border-2 border-[#F5F1E8]/30 p-4 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between text-[8px] font-poppins text-[#A8A29A] border-b border-[#F5F1E8]/15 pb-1.5">
              <span>MAAHLOX LE VIBEUR</span>
              <span className="text-[#FF5A1F]">OBILI</span>
            </div>
            <div className="my-auto py-2">
              <p className="font-display text-2xl text-[#F5F1E8] leading-none tracking-wide">
                {frontPrintText}
              </p>
              <p className="font-display text-sm text-[#FF5A1F] mt-1">
                EN GRAND
              </p>
            </div>
            <div className="pt-1.5 border-t border-[#F5F1E8]/15 text-[7px] font-poppins text-[#A8A29A] flex justify-between">
              <span>{subPrintText}</span>
              <span>YAOUNDÉ</span>
            </div>
          </div>
        )}
      </div>

      {/* Pied de vignette */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-poppins text-[#A8A29A] border-t border-[#F5F1E8]/12 pt-2">
        <span>{subPrintText}</span>
        <span className="uppercase tracking-wider">MAQUETTE STUDIO</span>
      </div>
    </div>
  );
};
