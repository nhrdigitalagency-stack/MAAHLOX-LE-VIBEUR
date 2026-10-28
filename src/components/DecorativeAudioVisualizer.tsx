import React, { useEffect, useRef } from 'react';
import { useAppSettings } from '../context/AppSettingsContext';

interface DecorativeAudioVisualizerProps {
  variant?: 'studio-panel' | 'footer-strip';
  className?: string;
}

export const DecorativeAudioVisualizer: React.FC<DecorativeAudioVisualizerProps> = ({
  variant = 'studio-panel',
  className = '',
}) => {
  const { language, theme } = useAppSettings();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;
    let animationFrameId: number | null = null;
    let isVisibleInViewport = true;
    let isDocumentVisible = !document.hidden;
    let phase = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const renderFrame = (currentPhase: number, isStatic: boolean) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      const isFooter = variant === 'footer-strip';
      const barSpacing = width < 640 ? 8 : 10;
      const barWidth = width < 640 ? 3 : 4;
      const totalBars = Math.max(12, Math.floor(width / barSpacing));
      const centerY = height / 2;

      // Ligne d'axe centrale adaptée au thème
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle =
        theme === 'dark'
          ? 'rgba(245, 241, 232, 0.08)'
          : 'rgba(18, 17, 16, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < totalBars; i++) {
        const normalizedIndex = i / totalBars;
        const envelope =
          Math.sin(normalizedIndex * Math.PI) *
          (0.65 + 0.35 * Math.sin(normalizedIndex * Math.PI * 3));

        const waveA = Math.sin(i * 0.32 + currentPhase * 1.4);
        const waveB = Math.cos(i * 0.19 - currentPhase * 0.9);
        const waveC = Math.sin(i * 0.65 + currentPhase * 2.1);

        const dynamicFactor = isStatic
          ? 0.45 + 0.25 * Math.abs(Math.sin(i * 0.45))
          : 0.3 + 0.7 * Math.abs(waveA * 0.5 + waveB * 0.35 + waveC * 0.15);

        const maxBarHeight = isFooter ? height * 0.72 : height * 0.82;
        const barHeight = Math.max(4, envelope * dynamicFactor * maxBarHeight);

        const x = i * barSpacing + (barSpacing - barWidth) / 2;
        const y = centerY - barHeight / 2;

        if (i % 11 === 0 && !isFooter) {
          ctx.fillStyle =
            theme === 'dark'
              ? 'rgba(223, 255, 0, 0.85)'
              : 'rgba(224, 72, 15, 0.95)';
        } else if (barHeight > maxBarHeight * 0.46) {
          ctx.fillStyle = 'rgba(255, 90, 31, 0.88)';
        } else {
          ctx.fillStyle =
            theme === 'dark'
              ? 'rgba(245, 241, 232, 0.28)'
              : 'rgba(18, 17, 16, 0.28)';
        }

        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    resizeCanvas();

    if (prefersReducedMotion) {
      renderFrame(1.2, true);
    }

    const animate = () => {
      if (prefersReducedMotion || !isVisibleInViewport || !isDocumentVisible) {
        animationFrameId = null;
        return;
      }

      renderFrame(phase, false);
      phase += 0.035;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startIfAllowed = () => {
      if (
        !prefersReducedMotion &&
        isVisibleInViewport &&
        isDocumentVisible &&
        animationFrameId === null
      ) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleInViewport = Boolean(entry?.isIntersecting);
        if (isVisibleInViewport) {
          if (prefersReducedMotion) {
            renderFrame(1.2, true);
          } else {
            startIfAllowed();
          }
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        startIfAllowed();
      } else {
        stopLoop();
      }
    };

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        renderFrame(1.2, true);
      } else {
        startIfAllowed();
      }
    };

    const handleResize = () => {
      resizeCanvas();
      if (prefersReducedMotion) {
        renderFrame(1.2, true);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    startIfAllowed();

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [variant, theme]);

  if (variant === 'footer-strip') {
    return (
      <div
        className={`w-full theme-surface border theme-border p-4 font-poppins ${className}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-[11px] font-medium theme-muted">
          <span className="theme-text uppercase tracking-widest">
            {language === 'fr'
              ? 'STUDIO SPECTRUM · VISUALISEUR DÉCORATIF'
              : 'STUDIO SPECTRUM · DECORATIVE VISUALIZER'}
          </span>
          <span>
            {language === 'fr'
              ? 'OBILI / YAOUNDÉ — AMBIANCE VISUELLE'
              : 'OBILI / YAOUNDÉ — VISUAL AMBIENCE'}
          </span>
        </div>
        <div className="relative h-12 w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-label={
              language === 'fr'
                ? 'Visualiseur spectral décoratif d’ambiance studio (sans lecture audio active)'
                : 'Decorative studio spectrum visualizer (no active audio playback)'
            }
            role="img"
            className="block h-full w-full pointer-events-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`theme-surface border theme-border p-5 md:p-6 font-poppins ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b theme-border">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest theme-accent-text">
            {language === 'fr'
              ? 'CONSOLE STUDIO · SPECTRE VISUEL DÉCORATIF'
              : 'STUDIO CONSOLE · DECORATIVE VISUAL SPECTRUM'}
          </span>
        </div>
        <span className="text-[11px] theme-muted">
          {language === 'fr'
            ? 'Animation graphique décorative (indépendante du son)'
            : 'Decorative graphic animation (independent of audio)'}
        </span>
      </div>

      <div className="relative h-20 md:h-24 w-full overflow-hidden theme-bg border theme-border px-3 py-2">
        <canvas
          ref={canvasRef}
          aria-label={
            language === 'fr'
              ? 'Animation spectrale décorative évoquant une console de studio musical'
              : 'Decorative spectral animation evoking a music studio console'
          }
          role="img"
          className="block h-full w-full pointer-events-none"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] theme-muted">
        <span>
          {language === 'fr'
            ? '20 Hz — 20 kHz · Représentation graphique de studio'
            : '20 Hz — 20 kHz · Studio graphic representation'}
        </span>
        <span>
          {language === 'fr'
            ? 'Pause automatique en mode mouvement réduit'
            : 'Auto-paused in reduced motion mode'}
        </span>
      </div>
    </div>
  );
};
