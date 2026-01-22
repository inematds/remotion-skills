import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme } from '../types';

const { fontFamily } = loadFont();

interface FeaturesSceneProps {
  features: string[];
  colors: ColorScheme;
}

const FeatureItem: React.FC<{
  feature: string;
  index: number;
  colors: ColorScheme;
}> = ({ feature, index, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - index * 10,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const x = interpolate(progress, [0, 1], [-100, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Animação do checkmark
  const checkProgress = spring({
    frame: frame - index * 10 - 5,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '20px 0',
        transform: `translateX(${x}px)`,
        opacity,
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${checkScale})`,
          boxShadow: `0 4px 20px ${colors.primary}66`,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.background}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Texto */}
      <span
        style={{
          color: colors.text,
          fontSize: 32,
          fontWeight: 500,
        }}
      >
        {feature}
      </span>
    </div>
  );
};

export const FeaturesScene: React.FC<FeaturesSceneProps> = ({ features, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        padding: 80,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}22 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary}22 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          maxWidth: 900,
          margin: '0 auto',
          zIndex: 1,
        }}
      >
        {/* Título */}
        <h2
          style={{
            color: colors.text,
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 50,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Por que escolher?
        </h2>

        {/* Lista de features */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {features.map((feature, index) => (
            <FeatureItem
              key={feature}
              feature={feature}
              index={index}
              colors={colors}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
