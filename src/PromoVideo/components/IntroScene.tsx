import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme } from '../types';

const { fontFamily } = loadFont();

interface IntroSceneProps {
  title: string;
  description: string;
  colors: ColorScheme;
  screenshotUrl?: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  title,
  description,
  colors,
  screenshotUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animações
  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const descProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const screenshotProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Efeito de glow pulsante
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [20, 40]
  );

  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const descY = interpolate(descProgress, [0, 1], [30, 0]);
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);

  const screenshotScale = interpolate(screenshotProgress, [0, 1], [0.8, 1]);
  const screenshotOpacity = interpolate(screenshotProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${colors.primary}22 0%, transparent 70%)`,
        }}
      />

      {/* Conteúdo */}
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
            fontSize: 72,
            fontWeight: 800,
            margin: 0,
            marginBottom: 24,
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textShadow: `0 0 ${glowIntensity}px ${colors.primary}`,
          }}
        >
          {title}
        </h1>

        {/* Descrição */}
        <p
          style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: 400,
            margin: 0,
            maxWidth: 800,
            opacity: descOpacity * 0.8,
            transform: `translateY(${descY}px)`,
          }}
        >
          {description}
        </p>

        {/* Screenshot do site */}
        {screenshotUrl && (
          <div
            style={{
              marginTop: 50,
              transform: `scale(${screenshotScale})`,
              opacity: screenshotOpacity,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: `0 25px 80px ${colors.primary}44`,
            }}
          >
            <Img
              src={screenshotUrl}
              style={{
                width: width * 0.6,
                height: 'auto',
                borderRadius: 16,
              }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
