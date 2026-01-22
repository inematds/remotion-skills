import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme, SiteStat } from '../types';

const { fontFamily } = loadFont();

interface StatsSceneProps {
  stats: SiteStat[];
  colors: ColorScheme;
}

const StatCard: React.FC<{
  stat: SiteStat;
  index: number;
  colors: ColorScheme;
}> = ({ stat, index, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - index * 8,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [40, 0]);

  // Animação do contador
  const countProgress = spring({
    frame: frame - index * 8 - 10,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
        backgroundColor: `${colors.primary}15`,
        borderRadius: 24,
        border: `2px solid ${colors.primary}33`,
        transform: `scale(${scale}) translateY(${y}px)`,
        opacity,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: colors.primary,
          marginBottom: 12,
          transform: `scale(${interpolate(countProgress, [0, 1], [0.8, 1])})`,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: colors.text,
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

export const StatsScene: React.FC<StatsSceneProps> = ({ stats, colors }) => {
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colors.primary}11 0%, transparent 50%, ${colors.secondary}11 100%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Título da seção */}
        <h2
          style={{
            color: colors.text,
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 60,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Números que Impressionam
        </h2>

        {/* Grid de stats */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              colors={colors}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
