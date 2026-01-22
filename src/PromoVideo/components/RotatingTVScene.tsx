import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme, SiteStat } from '../types';

const { fontFamily } = loadFont();

interface RotatingTVSceneProps {
  title: string;
  subtitle: string;
  description: string;
  stats: SiteStat[];
  features: string[];
  clients?: string[];
  courses?: string[];
  colors: ColorScheme;
  websiteUrl: string;
}

// Componente de estatística grande
const BigStat: React.FC<{
  stat: SiteStat;
  index: number;
  colors: ColorScheme;
}> = ({ stat, index, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 30 + index * 20;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Contador animado
  const numericValue = stat.value.replace(/[^0-9]/g, '');
  const suffix = stat.value.replace(/[0-9]/g, '');
  const countTo = parseInt(numericValue) || 0;
  const countProgress = interpolate(
    frame - delay,
    [0, 40],
    [0, countTo],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        textAlign: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: colors.primary,
          textShadow: `0 0 30px ${colors.primary}66`,
          fontFamily,
        }}
      >
        {suffix.startsWith('+') ? '+' : ''}
        {Math.floor(countProgress).toLocaleString()}
        {suffix.replace('+', '')}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: colors.text,
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: 3,
          marginTop: 8,
          fontFamily,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

// TV com rotação 3D rápida (180 graus)
const RotatingTV: React.FC<{
  colors: ColorScheme;
  websiteUrl: string;
  courses: string[];
}> = ({ colors, websiteUrl, courses }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Rotação rápida 180 graus contínua
  const rotateY = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360],
  );

  const rotateX = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [-10, 10]
  );

  // Entrada
  const entryProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  const entryScale = interpolate(entryProgress, [0, 1], [0.3, 1]);
  const entryOpacity = interpolate(entryProgress, [0, 1], [0, 1]);

  // Glow pulsante
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [20, 50]
  );

  // Cores animadas do gradiente
  const hue1 = (frame * 2) % 360;
  const hue2 = (frame * 2 + 120) % 360;
  const hue3 = (frame * 2 + 240) % 360;

  return (
    <div
      style={{
        transform: `
          scale(${entryScale})
          perspective(1200px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
        `,
        opacity: entryOpacity,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Monitor Frame */}
      <div
        style={{
          width: 550,
          height: 350,
          backgroundColor: '#0a0a0a',
          borderRadius: 20,
          padding: 12,
          boxShadow: `
            0 0 ${glowIntensity}px ${colors.primary},
            0 0 ${glowIntensity * 2}px ${colors.secondary}66,
            0 30px 60px rgba(0,0,0,0.8)
          `,
          border: '4px solid #1a1a1a',
        }}
      >
        {/* Screen com gradiente animado */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(
              ${frame * 3}deg,
              hsl(${hue1}, 80%, 50%),
              hsl(${hue2}, 80%, 50%),
              hsl(${hue3}, 80%, 50%)
            )`,
          }}
        >
          {/* Logo central */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                fontFamily,
                letterSpacing: -2,
              }}
            >
              SISNEMA
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#fff',
                opacity: 0.9,
                marginTop: 10,
                fontFamily,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              Inovação e Conhecimento
            </div>
          </div>

          {/* Padrão de ondas animadas */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: -50 + i * 30,
                left: -100,
                right: -100,
                height: 100,
                background: `rgba(255,255,255,${0.05 + i * 0.02})`,
                borderRadius: '50%',
                transform: `translateY(${Math.sin((frame + i * 20) * 0.05) * 20}px)`,
              }}
            />
          ))}

          {/* Partículas na tela */}
          {Array.from({ length: 15 }).map((_, i) => {
            const x = ((frame * (1 + i * 0.3) + i * 50) % 550);
            const y = ((frame * (0.5 + i * 0.2) + i * 30) % 350);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 4 + (i % 3) * 2,
                  height: 4 + (i % 3) * 2,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  opacity: 0.6,
                  boxShadow: '0 0 10px #fff',
                }}
              />
            );
          })}

          {/* Screen shine */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Stand */}
      <div
        style={{
          width: 120,
          height: 12,
          backgroundColor: '#0a0a0a',
          margin: '0 auto',
          borderRadius: '0 0 6px 6px',
        }}
      />
      <div
        style={{
          width: 60,
          height: 40,
          backgroundColor: '#0a0a0a',
          margin: '0 auto',
          borderRadius: '0 0 4px 4px',
        }}
      />
      <div
        style={{
          width: 150,
          height: 8,
          backgroundColor: '#111',
          margin: '0 auto',
          borderRadius: 4,
          boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
        }}
      />

      {/* URL floating */}
      <div
        style={{
          position: 'absolute',
          bottom: -55,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          padding: '12px 28px',
          borderRadius: 30,
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          fontFamily,
          boxShadow: `0 4px 25px ${colors.primary}88`,
        }}
      >
        {websiteUrl}
      </div>
    </div>
  );
};

// Feature item animado
const FeatureItem: React.FC<{
  feature: string;
  index: number;
  colors: ColorScheme;
  startFrame: number;
}> = ({ feature, index, colors, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * 8;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const x = interpolate(progress, [0, 1], [-30, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
        transform: `translateX(${x}px)`,
        opacity,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: 500,
          fontFamily,
        }}
      >
        {feature}
      </span>
    </div>
  );
};

export const RotatingTVScene: React.FC<RotatingTVSceneProps> = ({
  title,
  subtitle,
  description,
  stats,
  features,
  courses = [],
  colors,
  websiteUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Título
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Partículas
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 73) % 100,
    speed: 0.3 + (i % 4) * 0.2,
    size: 2 + (i % 4),
    delay: i * 7,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, ${colors.primary}12 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, ${colors.secondary}10 0%, transparent 40%),
            radial-gradient(ellipse at 50% 100%, ${colors.accent}08 0%, transparent 30%)
          `,
        }}
      />

      {/* Partículas */}
      {particles.map((p, i) => {
        const y = interpolate(
          (frame * p.speed + p.delay) % 250,
          [0, 250],
          [105, -5]
        );
        const opacity = interpolate(y, [0, 20, 80, 100], [0, 0.4, 0.4, 0]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? colors.primary : colors.secondary,
              opacity,
            }}
          />
        );
      })}

      {/* Grid de linhas decorativas */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${colors.primary}05 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}05 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
        }}
      />

      {/* Conteúdo esquerda */}
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 60,
          width: 520,
          zIndex: 2,
        }}
      >
        {/* Título */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: 4,
              marginBottom: 12,
            }}
          >
            {subtitle}
          </div>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: colors.text,
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 18,
              color: colors.text,
              opacity: 0.7,
              margin: 0,
              marginBottom: 30,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 30,
            marginBottom: 35,
          }}
        >
          {stats.slice(0, 3).map((stat, i) => (
            <BigStat key={stat.label} stat={stat} index={i} colors={colors} />
          ))}
        </div>

        {/* Features */}
        <div>
          {features.map((feature, i) => (
            <FeatureItem
              key={feature}
              feature={feature}
              index={i}
              colors={colors}
              startFrame={80}
            />
          ))}
        </div>
      </div>

      {/* TV à direita */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <RotatingTV
          colors={colors}
          websiteUrl={websiteUrl}
          courses={courses}
        />
      </div>
    </AbsoluteFill>
  );
};
