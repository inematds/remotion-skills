import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ColorScheme, SiteStat } from '../types';

const { fontFamily } = loadFont();

interface TVShowcaseSceneProps {
  title: string;
  description: string;
  stats: SiteStat[];
  features: string[];
  colors: ColorScheme;
  screenshotUrl?: string;
  websiteUrl: string;
}

// Componente de informação que desce
const InfoItem: React.FC<{
  children: React.ReactNode;
  index: number;
  colors: ColorScheme;
  type: 'title' | 'description' | 'stat' | 'feature';
}> = ({ children, index, colors, type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 12;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const y = interpolate(progress, [0, 1], [-50, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const styles: Record<string, React.CSSProperties> = {
    title: {
      fontSize: 56,
      fontWeight: 800,
      color: colors.text,
      marginBottom: 16,
    },
    description: {
      fontSize: 24,
      fontWeight: 400,
      color: colors.text,
      opacity: 0.8,
      marginBottom: 32,
      lineHeight: 1.5,
    },
    stat: {
      fontSize: 20,
      fontWeight: 600,
      color: colors.primary,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    feature: {
      fontSize: 20,
      fontWeight: 500,
      color: colors.text,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
  };

  return (
    <div
      style={{
        ...styles[type],
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      {type === 'feature' && (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: colors.primary,
          }}
        />
      )}
      {children}
    </div>
  );
};

// Componente da TV com perspectiva
const TVFrame: React.FC<{
  screenshotUrl?: string;
  colors: ColorScheme;
  websiteUrl: string;
}> = ({ screenshotUrl, colors, websiteUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const slideX = interpolate(entryProgress, [0, 1], [300, 0]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const rotateY = interpolate(entryProgress, [0, 1], [-30, -15]);

  // Efeito de scroll no site
  const scrollY = interpolate(
    frame,
    [60, 240],
    [0, -600],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Glow pulsante
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [20, 40]
  );

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: '50%',
        transform: `translateY(-50%) translateX(${slideX}px) perspective(1200px) rotateY(${rotateY}deg)`,
        opacity,
      }}
    >
      {/* TV Frame */}
      <div
        style={{
          width: 700,
          height: 500,
          backgroundColor: '#1a1a1a',
          borderRadius: 20,
          padding: 15,
          boxShadow: `
            0 0 ${glowIntensity}px ${colors.primary}66,
            0 25px 60px rgba(0,0,0,0.5),
            inset 0 0 30px rgba(0,0,0,0.3)
          `,
          border: `3px solid #333`,
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0f0f0f',
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Site content placeholder */}
          {screenshotUrl ? (
            <div style={{ transform: `translateY(${scrollY}px)` }}>
              <Img
                src={screenshotUrl}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          ) : (
            // Placeholder animado quando não há screenshot
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(180deg, ${colors.primary}22 0%, ${colors.background} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                padding: 30,
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              {/* Header placeholder */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 40,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: colors.primary,
                    fontFamily,
                  }}
                >
                  INEMA.CLUB
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                  {['Home', 'Cursos', 'Comunidade'].map((item) => (
                    <div
                      key={item}
                      style={{
                        fontSize: 14,
                        color: colors.text,
                        opacity: 0.7,
                        fontFamily,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero placeholder */}
              <div style={{ marginBottom: 30 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: colors.text,
                    marginBottom: 15,
                    fontFamily,
                  }}
                >
                  Crie sua Equipe
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: colors.text,
                    opacity: 0.6,
                    fontFamily,
                  }}
                >
                  Prepare-se para o futuro com IA
                </div>
              </div>

              {/* Cards placeholder */}
              <div style={{ display: 'flex', gap: 15 }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 120,
                      backgroundColor: `${colors.primary}22`,
                      borderRadius: 12,
                      border: `1px solid ${colors.primary}33`,
                    }}
                  />
                ))}
              </div>

              {/* More content */}
              <div style={{ marginTop: 30 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 60,
                      backgroundColor: `${colors.text}11`,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Screen reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* TV Stand */}
      <div
        style={{
          width: 200,
          height: 20,
          backgroundColor: '#1a1a1a',
          margin: '0 auto',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
      />
      <div
        style={{
          width: 100,
          height: 40,
          backgroundColor: '#1a1a1a',
          margin: '0 auto',
          borderRadius: '0 0 5px 5px',
        }}
      />

      {/* URL Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: colors.primary,
          padding: '8px 20px',
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 600,
          color: colors.background,
          fontFamily,
        }}
      >
        {websiteUrl}
      </div>
    </div>
  );
};

export const TVShowcaseScene: React.FC<TVShowcaseSceneProps> = ({
  title,
  description,
  stats,
  features,
  colors,
  screenshotUrl,
  websiteUrl,
}) => {
  const frame = useCurrentFrame();

  // Partículas de fundo
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 97) % 100,
    speed: 0.5 + (i % 3) * 0.3,
    size: 2 + (i % 3),
    delay: i * 10,
  }));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily,
        overflow: 'hidden',
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
          background: `
            radial-gradient(ellipse at 0% 50%, ${colors.primary}15 0%, transparent 50%),
            radial-gradient(ellipse at 100% 80%, ${colors.secondary}10 0%, transparent 40%)
          `,
        }}
      />

      {/* Partículas */}
      {particles.map((p, i) => {
        const y = interpolate(
          (frame + p.delay) % 200,
          [0, 200],
          [110, -10]
        );
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
              backgroundColor: colors.primary,
              opacity: 0.3,
            }}
          />
        );
      })}

      {/* Conteúdo da esquerda */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 80,
          width: 500,
          zIndex: 1,
        }}
      >
        <InfoItem index={0} colors={colors} type="title">
          {title}
        </InfoItem>

        <InfoItem index={1} colors={colors} type="description">
          {description}
        </InfoItem>

        {/* Stats */}
        <div style={{ marginBottom: 30, marginTop: 20 }}>
          {stats.map((stat, i) => (
            <InfoItem key={stat.label} index={i + 2} colors={colors} type="stat">
              <span style={{ color: colors.text, fontWeight: 800, fontSize: 28 }}>
                {stat.value}
              </span>
              <span style={{ color: colors.text, opacity: 0.6 }}>
                {stat.label}
              </span>
            </InfoItem>
          ))}
        </div>

        {/* Features */}
        <div style={{ marginTop: 20 }}>
          {features.map((feature, i) => (
            <InfoItem
              key={feature}
              index={i + stats.length + 3}
              colors={colors}
              type="feature"
            >
              {feature}
            </InfoItem>
          ))}
        </div>
      </div>

      {/* TV à direita */}
      <TVFrame
        screenshotUrl={screenshotUrl}
        colors={colors}
        websiteUrl={websiteUrl}
      />
    </AbsoluteFill>
  );
};
