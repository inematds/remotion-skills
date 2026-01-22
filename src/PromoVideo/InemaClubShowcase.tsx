import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

// Cores do INEMA
const colors = {
  primary: '#8b5cf6',
  secondary: '#6366f1',
  accent: '#22c55e',
  orange: '#f59e0b',
  pink: '#ec4899',
  cyan: '#06b6d4',
  background: '#0a0a0f',
  text: '#ffffff',
};

// Dados completos do INEMA.CLUB
const inemaData = {
  title: 'INEMA.CLUB',
  subtitle: 'Portal INEMA',
  slogan: 'Crie sua Equipe, Seu Time. Nós Ajudamos.',
  description: 'Acesso centralizado aos seus cursos e plataformas. Preparação para o futuro com IA e Robótica.',
  heroText: 'Comece sua jornada agora e compartilhe as trilhas especiais para iniciantes. É aqui que o futuro começa — e ele precisa de você.',

  stats: [
    { label: 'Repositórios GitHub', value: '18', icon: '📦' },
    { label: 'Canais Telegram', value: '25+', icon: '💬' },
    { label: 'Contas TikTok', value: '6', icon: '🎵' },
    { label: 'Top Stars', value: '12⭐', icon: '🏆' },
  ],

  trilha: [
    { code: 'FEP', name: 'Fundamentos de Engenharia de Prompts', emoji: '✍️' },
    { code: 'ATIA', name: 'AI Tools in Action', emoji: '🤖' },
    { code: 'FDB', name: 'Fundamentos de Banco de Dados', emoji: '🗄️' },
    { code: 'Vision', name: 'Processamento de Imagens com IA', emoji: '👁️' },
  ],

  repos: [
    { name: 'BMAD-Academy', stars: 12, emoji: '📚' },
    { name: 'FEA-IA', stars: 10, emoji: '🧠' },
    { name: 'FEP', stars: 7, emoji: '✍️' },
    { name: 'lk_agente_v3', stars: 5, emoji: '🎤' },
    { name: 'whatsapp-agentkit', stars: 4, emoji: '📱' },
    { name: 'agent-browser', stars: 0, emoji: '🤖' },
    { name: 'DublarV4', stars: 1, emoji: '🎙️' },
    { name: 'VisionPro', stars: 0, emoji: '🎬' },
  ],

  canais: [
    'INEMA.VIP', 'INEMA.IA', 'INEMA.DEV', 'INEMA.AGENTES',
    'INEMA.PROMPTS', 'INEMA.VIDEOS', 'INEMA.VISION', 'INEMA.VOZ',
    'INEMA.TOOLS', 'INEMA.N8N', 'INEMA.Make', 'BMAD Método',
  ],

  social: {
    tiktok: ['@inema.tds', '@inema.tia', '@inemafuturos', '@inema.tech', '@inema.prompts', '@inema.robot'],
    instagram: ['@inema.tds', '@inema.tia'],
    youtube: '@inematdsx',
  },
};

// Componente de texto animado à esquerda
const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay: number;
  type?: 'title' | 'subtitle' | 'body' | 'stat';
}> = ({ children, delay, type = 'body' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const y = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const styles: Record<string, React.CSSProperties> = {
    title: { fontSize: 56, fontWeight: 900, marginBottom: 16 },
    subtitle: { fontSize: 24, fontWeight: 600, color: colors.primary, marginBottom: 24 },
    body: { fontSize: 20, fontWeight: 400, opacity: 0.8, lineHeight: 1.6, marginBottom: 16 },
    stat: { fontSize: 18, fontWeight: 500 },
  };

  return (
    <div
      style={{
        ...styles[type],
        color: colors.text,
        transform: `translateY(${y}px)`,
        opacity,
        fontFamily,
      }}
    >
      {children}
    </div>
  );
};

// Seção 1: Introdução (0-9s)
const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ padding: 60, maxWidth: 600 }}>
      <AnimatedText delay={0} type="subtitle">
        Portal INEMA
      </AnimatedText>
      <AnimatedText delay={10} type="title">
        INEMA.CLUB
      </AnimatedText>
      <AnimatedText delay={25} type="body">
        {inemaData.slogan}
      </AnimatedText>
      <AnimatedText delay={40} type="body">
        {inemaData.description}
      </AnimatedText>
      <AnimatedText delay={60} type="body">
        Preparação para profissionais especiais, criativos e adaptáveis para o mundo com IA e Robótica.
      </AnimatedText>
    </div>
  );
};

// Seção 2: Estatísticas (9-18s)
const StatsSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ padding: 60, maxWidth: 600 }}>
      <AnimatedText delay={0} type="subtitle">
        Números que Impressionam
      </AnimatedText>
      <AnimatedText delay={15} type="title">
        Comunidade Ativa
      </AnimatedText>

      <div style={{ marginTop: 40 }}>
        {inemaData.stats.map((stat, i) => {
          const delay = 30 + i * 20;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const numValue = parseInt(stat.value) || 0;
          const countTo = interpolate(
            frame - delay,
            [0, 30],
            [0, numValue],
            { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
          );

          return (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 24,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
              }}
            >
              <span style={{ fontSize: 40 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: 42, fontWeight: 900, color: colors.primary, fontFamily }}>
                  {Math.floor(countTo)}{stat.value.includes('+') ? '+' : ''}{stat.value.includes('⭐') ? '⭐' : ''}
                </div>
                <div style={{ fontSize: 16, color: colors.text, opacity: 0.7, fontFamily }}>
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Seção 3: Trilha de Cursos (18-27s)
const TrilhaSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ padding: 60, maxWidth: 600 }}>
      <AnimatedText delay={0} type="subtitle">
        Trilha para Iniciantes
      </AnimatedText>
      <AnimatedText delay={15} type="title">
        4 Cursos Essenciais
      </AnimatedText>

      <div style={{ marginTop: 30 }}>
        {inemaData.trilha.map((curso, i) => {
          const delay = 35 + i * 25;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });

          return (
            <div
              key={curso.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 20,
                padding: '16px 20px',
                backgroundColor: `${colors.primary}15`,
                borderRadius: 12,
                borderLeft: `4px solid ${colors.primary}`,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(progress, [0, 1], [-50, 0])}px)`,
              }}
            >
              <span style={{ fontSize: 32 }}>{curso.emoji}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary, fontFamily }}>
                  {curso.code}
                </div>
                <div style={{ fontSize: 16, color: colors.text, fontFamily }}>
                  {curso.name}
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: colors.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily,
                }}
              >
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Seção 4: Repositórios (27-36s)
const ReposSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ padding: 60, maxWidth: 600 }}>
      <AnimatedText delay={0} type="subtitle">
        Open Source
      </AnimatedText>
      <AnimatedText delay={15} type="title">
        18 Repositórios GitHub
      </AnimatedText>

      <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {inemaData.repos.map((repo, i) => {
          const delay = 30 + i * 10;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          return (
            <div
              key={repo.name}
              style={{
                padding: '12px 16px',
                backgroundColor: `${colors.secondary}20`,
                borderRadius: 10,
                border: `1px solid ${colors.secondary}40`,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{repo.emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.text, fontFamily }}>
                  {repo.name}
                </span>
                {repo.stars > 0 && (
                  <span style={{ fontSize: 12, color: colors.orange, fontFamily }}>
                    ⭐{repo.stars}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Seção 5: Comunidade e CTA (36-45s)
const CommunitySection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [1, 1.05]);

  return (
    <div style={{ padding: 60, maxWidth: 600 }}>
      <AnimatedText delay={0} type="subtitle">
        Comunidade Vibrante
      </AnimatedText>
      <AnimatedText delay={15} type="title">
        25+ Canais Telegram
      </AnimatedText>

      <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {inemaData.canais.slice(0, 8).map((canal, i) => {
          const delay = 30 + i * 8;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={canal}
              style={{
                padding: '8px 14px',
                backgroundColor: `${colors.cyan}20`,
                borderRadius: 20,
                fontSize: 13,
                color: colors.cyan,
                fontWeight: 600,
                fontFamily,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
              }}
            >
              💬 {canal}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 50,
          transform: `scale(${pulse})`,
        }}
      >
        <AnimatedText delay={80} type="body">
          Faça parte da comunidade!
        </AnimatedText>
        <div
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '18px 40px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            borderRadius: 30,
            fontSize: 20,
            fontWeight: 700,
            color: '#fff',
            fontFamily,
            boxShadow: `0 8px 30px ${colors.primary}66`,
          }}
        >
          Acesse inema.club →
        </div>
      </div>
    </div>
  );
};

// TV com conteúdo do site (sincronizado com seções)
const TVWithContent: React.FC<{ section: number }> = ({ section }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Rotação suave
  const rotateY = interpolate(
    frame,
    [0, durationInFrames],
    [-20, -15],
    { easing: Easing.inOut(Easing.ease) }
  );

  const rotateX = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [-3, 3]
  );

  // Entrada
  const entry = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  // Scroll SINCRONIZADO com as seções (cada seção = 270 frames = 9 segundos)
  // Seção 0: Intro (0-270) -> scroll 0
  // Seção 1: Stats (270-540) -> scroll para stats
  // Seção 2: Trilha (540-810) -> scroll para trilha
  // Seção 3: Repos (810-1080) -> scroll para repos
  // Seção 4: Community (1080-1350) -> scroll para community
  const scrollY = interpolate(
    frame,
    [0, 270, 540, 810, 1080, 1350],
    [0, -50, -380, -750, -1100, -1400],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const glowIntensity = interpolate(Math.sin(frame * 0.08), [-1, 1], [15, 35]);

  return (
    <div
      style={{
        position: 'absolute',
        right: 60,
        top: '50%',
        transform: `
          translateY(-50%)
          perspective(1400px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          scale(${interpolate(entry, [0, 1], [0.8, 1])})
        `,
        opacity: interpolate(entry, [0, 1], [0, 1]),
      }}
    >
      {/* Monitor */}
      <div
        style={{
          width: 650,
          height: 420,
          backgroundColor: '#0a0a0a',
          borderRadius: 20,
          padding: 14,
          boxShadow: `
            0 0 ${glowIntensity}px ${colors.primary}55,
            0 40px 80px rgba(0,0,0,0.7)
          `,
          border: '4px solid #1a1a1a',
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0f0f15',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Conteúdo do site simulado - SINCRONIZADO */}
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: 30,
            }}
          >
            {/* ===== SEÇÃO 1: INTRO (frames 0-270) ===== */}
            <div style={{ marginBottom: 50 }}>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 30,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${colors.primary}33`,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900, color: colors.primary, fontFamily }}>
                  INEMA.CLUB
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {['Cursos', 'Comunidade', 'GitHub'].map((item) => (
                    <span key={item} style={{ fontSize: 13, color: colors.text, opacity: 0.6, fontFamily }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero */}
              <div
                style={{
                  padding: 50,
                  background: `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}25)`,
                  borderRadius: 20,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: colors.text, marginBottom: 16, fontFamily }}>
                  Crie sua Equipe, Seu Time
                </div>
                <div style={{ fontSize: 18, color: colors.text, opacity: 0.8, marginBottom: 20, fontFamily }}>
                  Nós Ajudamos. Prepare-se para o futuro com IA e Robótica.
                </div>
                <div style={{ fontSize: 14, color: colors.text, opacity: 0.6, fontFamily, maxWidth: 400, margin: '0 auto' }}>
                  É aqui que o futuro começa — e ele precisa de você.
                </div>
              </div>
            </div>

            {/* ===== SEÇÃO 2: STATS (frames 270-540) ===== */}
            <div style={{ marginBottom: 50, paddingTop: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 24, fontFamily, textAlign: 'center' }}>
                📊 Números que Impressionam
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {inemaData.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: 30,
                      backgroundColor: `${colors.primary}18`,
                      borderRadius: 16,
                      textAlign: 'center',
                      border: `2px solid ${colors.primary}30`,
                    }}
                  >
                    <div style={{ fontSize: 36 }}>{stat.icon}</div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: colors.primary, fontFamily, marginTop: 8 }}>{stat.value}</div>
                    <div style={{ fontSize: 13, color: colors.text, opacity: 0.7, fontFamily, marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== SEÇÃO 3: TRILHA (frames 540-810) ===== */}
            <div style={{ marginBottom: 50, paddingTop: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 24, fontFamily }}>
                🎯 Trilha para Iniciantes
              </div>
              <div style={{ fontSize: 14, color: colors.text, opacity: 0.6, marginBottom: 20, fontFamily }}>
                Siga esta ordem para começar sua jornada:
              </div>
              {inemaData.trilha.map((curso, i) => (
                <div
                  key={curso.code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 20,
                    backgroundColor: `${colors.accent}12`,
                    borderRadius: 14,
                    marginBottom: 14,
                    borderLeft: `5px solid ${colors.accent}`,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', backgroundColor: colors.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, color: '#fff', fontFamily
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 28 }}>{curso.emoji}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: colors.accent, fontFamily }}>{curso.code}</div>
                    <div style={{ fontSize: 13, color: colors.text, opacity: 0.8, fontFamily }}>{curso.name}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== SEÇÃO 4: REPOS (frames 810-1080) ===== */}
            <div style={{ marginBottom: 50, paddingTop: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 24, fontFamily }}>
                📦 18 Repositórios Open Source
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {inemaData.repos.map((repo) => (
                  <div
                    key={repo.name}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: `${colors.secondary}18`,
                      borderRadius: 10,
                      fontSize: 13,
                      color: colors.text,
                      fontFamily,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      border: `1px solid ${colors.secondary}30`,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{repo.emoji}</span>
                    <span style={{ fontWeight: 600 }}>{repo.name}</span>
                    {repo.stars > 0 && (
                      <span style={{ color: colors.orange, fontWeight: 700 }}>⭐{repo.stars}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== SEÇÃO 5: COMUNIDADE (frames 1080-1350) ===== */}
            <div style={{ paddingTop: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 24, fontFamily }}>
                💬 25+ Canais Telegram
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
                {inemaData.canais.map((canal) => (
                  <div
                    key={canal}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: `${colors.cyan}18`,
                      borderRadius: 20,
                      fontSize: 12,
                      color: colors.cyan,
                      fontFamily,
                      fontWeight: 600,
                    }}
                  >
                    💬 {canal}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, marginBottom: 20, fontFamily }}>
                🌐 Redes Sociais
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { name: 'TikTok', count: '6 contas' },
                  { name: 'Instagram', count: '2 contas' },
                  { name: 'YouTube', count: '@inematdsx' },
                  { name: 'Facebook', count: '2 páginas' },
                ].map((social) => (
                  <div
                    key={social.name}
                    style={{
                      padding: '14px 20px',
                      backgroundColor: `${colors.pink}18`,
                      borderRadius: 12,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 14, color: colors.pink, fontWeight: 700, fontFamily }}>{social.name}</div>
                    <div style={{ fontSize: 11, color: colors.text, opacity: 0.6, fontFamily, marginTop: 4 }}>{social.count}</div>
                  </div>
                ))}
              </div>

              {/* CTA na TV */}
              <div style={{
                marginTop: 40,
                padding: 30,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: 16,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily }}>
                  Faça parte da comunidade!
                </div>
                <div style={{ fontSize: 14, color: '#fff', opacity: 0.9, fontFamily, marginTop: 8 }}>
                  Acesse inema.club →
                </div>
              </div>
            </div>
          </div>

          {/* Screen reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Stand */}
      <div style={{ width: 140, height: 12, backgroundColor: '#0a0a0a', margin: '0 auto', borderRadius: '0 0 8px 8px' }} />
      <div style={{ width: 70, height: 45, backgroundColor: '#0a0a0a', margin: '0 auto' }} />
      <div style={{ width: 160, height: 8, backgroundColor: '#111', margin: '0 auto', borderRadius: 4 }} />

      {/* URL Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          padding: '12px 28px',
          borderRadius: 25,
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          fontFamily,
          boxShadow: `0 4px 25px ${colors.primary}66`,
        }}
      >
        inema.club
      </div>
    </div>
  );
};

// Componente principal
export const InemaClubShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Volume com fade in e fade out
  const volume = interpolate(
    frame,
    [0, 30, durationInFrames - 60, durationInFrames],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Partículas de fundo
  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 61) % 100,
    speed: 0.2 + (i % 5) * 0.15,
    size: 2 + (i % 4),
    hue: (i * 30) % 360,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background, fontFamily }}>
      {/* Música de fundo */}
      <Audio src={staticFile('music.mp3')} volume={volume} />
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, ${colors.primary}10 0%, transparent 50%),
            radial-gradient(ellipse at 80% 60%, ${colors.secondary}10 0%, transparent 40%),
            radial-gradient(ellipse at 50% 90%, ${colors.accent}08 0%, transparent 30%)
          `,
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${colors.primary}03 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}03 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => {
        const y = ((frame * p.speed + i * 20) % 120) - 10;
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
              backgroundColor: `hsl(${p.hue}, 70%, 60%)`,
              opacity: 0.3,
            }}
          />
        );
      })}

      {/* Seções de texto à esquerda */}
      <Sequence from={0} durationInFrames={270}>
        <IntroSection />
      </Sequence>

      <Sequence from={270} durationInFrames={270}>
        <StatsSection />
      </Sequence>

      <Sequence from={540} durationInFrames={270}>
        <TrilhaSection />
      </Sequence>

      <Sequence from={810} durationInFrames={270}>
        <ReposSection />
      </Sequence>

      <Sequence from={1080} durationInFrames={270}>
        <CommunitySection />
      </Sequence>

      {/* TV com scroll contínuo */}
      <TVWithContent section={Math.floor(frame / 270)} />
    </AbsoluteFill>
  );
};

export default InemaClubShowcase;
