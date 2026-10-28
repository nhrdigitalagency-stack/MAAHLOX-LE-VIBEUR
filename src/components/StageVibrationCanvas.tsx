import React, { useEffect, useRef } from 'react';
import { useAppSettings } from '../context/AppSettingsContext';

interface StageVibrationCanvasProps {
  className?: string;
}

/**
 * Section 17 : Fond Canvas optionnel
 * Effet abstrait et discret d'ondes de vibration acoustique et de halo scénique.
 * - pointer-events: none
 * - pixel ratio plafonné à 1.5
 * - pause hors écran (IntersectionObserver) et onglet masqué (visibilitychange)
 * - désactivé si prefers-reduced-motion: reduce
 * - version allégée sur mobile
 */
export const StageVibrationCanvas: React.FC<StageVibrationCanvasProps> = ({ className = '' }) => {
  const { theme } = useAppSettings();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisibleInViewport = true;
    let isDocumentVisible = !document.hidden;
    let time = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const draw = () => {
      if (!isVisibleInViewport || !isDocumentVisible) {
        animationFrameId = null;
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Nombre de lignes d'onde adapté au viewport (version allégée sur mobile)
      const isMobile = width < 768;
      const lineCount = isMobile ? 3 : 5;
      const stepX = isMobile ? 18 : 12;

      // Halo de scène subtil
      const radial = ctx.createRadialGradient(
        width * 0.65,
        height * 0.4,
        10,
        width * 0.65,
        height * 0.4,
        Math.max(width, height) * 0.55
      );
      radial.addColorStop(0, 'rgba(255, 90, 31, 0.10)');
      radial.addColorStop(0.5, 'rgba(255, 90, 31, 0.03)');
      radial.addColorStop(1, 'rgba(8, 8, 8, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Lignes d'ondes acoustiques lentes adaptées au thème sombre/clair
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const baseY = height * (0.28 + i * 0.13);
        const amplitude = (isMobile ? 8 : 14) + i * 3;
        const frequency = 0.0035 + i * 0.0006;

        for (let x = 0; x <= width; x += stepX) {
          const y =
            baseY +
            Math.sin(x * frequency + time + i * 1.1) * amplitude +
            Math.cos(x * frequency * 0.5 - time * 0.7) * (amplitude * 0.4);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle =
          i === 1
            ? 'rgba(255, 90, 31, 0.16)'
            : theme === 'dark'
            ? 'rgba(245, 241, 232, 0.05)'
            : 'rgba(18, 17, 16, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      time += 0.008;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    const startLoopIfEligible = () => {
      if (isVisibleInViewport && isDocumentVisible && animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleInViewport = Boolean(entry?.isIntersecting);
        if (isVisibleInViewport) {
          startLoopIfEligible();
        } else if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        startLoopIfEligible();
      } else if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    startLoopIfEligible();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Fallback CSS statique toujours présent en arrière-plan */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 68% 36%, rgba(255, 90, 31, 0.12) 0%, rgba(8, 8, 8, 0) 60%)',
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
};
