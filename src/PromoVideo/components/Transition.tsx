import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import type { ColorScheme } from '../types';

interface TransitionProps {
  type: 'fade' | 'wipe' | 'zoom' | 'slide';
  colors: ColorScheme;
  duration?: number;
}

export const Transition: React.FC<TransitionProps> = ({
  type,
  colors,
  duration = 15,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (type === 'fade') {
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);
    return (
      <AbsoluteFill
        style={{
          backgroundColor: colors.background,
          opacity,
        }}
      />
    );
  }

  if (type === 'wipe') {
    const width = interpolate(progress, [0, 0.5, 1], [0, 100, 0]);
    return (
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${width}%`,
            backgroundColor: colors.primary,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (type === 'zoom') {
    const scale = interpolate(progress, [0, 0.5, 1], [0, 1.5, 0]);
    const opacity = interpolate(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    return (
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: colors.primary,
            transform: `scale(${scale * 20})`,
            opacity,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (type === 'slide') {
    const x = interpolate(progress, [0, 0.5, 1], [-100, 0, 100]);
    const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    return (
      <AbsoluteFill
        style={{
          backgroundColor: colors.primary,
          transform: `translateX(${x}%)`,
          opacity,
        }}
      />
    );
  }

  return null;
};

// Efeito de glitch para transições
export const GlitchTransition: React.FC<{ colors: ColorScheme }> = ({ colors }) => {
  const frame = useCurrentFrame();

  const slices = 10;
  const glitchIntensity = interpolate(
    frame,
    [0, 5, 10, 15],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {[...Array(slices)].map((_, i) => {
        const offset = Math.sin(frame * 2 + i) * 20 * glitchIntensity;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: offset,
              top: `${(i / slices) * 100}%`,
              width: '100%',
              height: `${100 / slices}%`,
              backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary,
              opacity: glitchIntensity * 0.3,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
