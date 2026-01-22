import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme } from '../types';

const { fontFamily } = loadFont();

interface CTASceneProps {
  title: string;
  ctaText: string;
  ctaUrl: string;
  colors: ColorScheme;
}

export const CTAScene: React.FC<CTASceneProps> = ({
  title,
  ctaText,
  ctaUrl,
  colors,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animações
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const buttonProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const urlProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const buttonScale = interpolate(buttonProgress, [0, 1], [0.5, 1]);
  const buttonOpacity = interpolate(buttonProgress, [0, 1], [0, 1]);

  const urlY = interpolate(urlProgress, [0, 1], [20, 0]);
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);

  // Efeito de pulse no botão
  const pulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [1, 1.05]
  );

  // Efeito de glow animado
  const glowSize = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [30, 50]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background animado */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, ${colors.primary}22 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${colors.secondary}22 0%, transparent 50%)
          `,
        }}
      />

      {/* Partículas decorativas */}
      {[...Array(6)].map((_, i) => {
        const particleProgress = (frame + i * 30) % 120;
        const x = 200 + i * 250;
        const y = interpolate(particleProgress, [0, 120], [800, -100]);
        const opacity = interpolate(particleProgress, [0, 60, 120], [0, 0.5, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: colors.primary,
              opacity,
            }}
          />
        );
      })}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {/* Título */}
        <h1
          style={{
            color: colors.text,
            fontSize: 64,
            fontWeight: 800,
            margin: 0,
            marginBottom: 50,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>

        {/* Botão CTA */}
        <div
          style={{
            transform: `scale(${buttonScale * pulse})`,
            opacity: buttonOpacity,
          }}
        >
          <div
            style={{
              padding: '24px 64px',
              backgroundColor: colors.primary,
              borderRadius: 16,
              boxShadow: `0 0 ${glowSize}px ${colors.primary}88`,
            }}
          >
            <span
              style={{
                color: colors.background,
                fontSize: 32,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              {ctaText}
            </span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 40,
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <span
            style={{
              color: colors.text,
              fontSize: 24,
              opacity: 0.6,
              fontFamily: 'monospace',
            }}
          >
            {ctaUrl}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
