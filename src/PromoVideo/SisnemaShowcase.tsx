import { AbsoluteFill, Sequence } from 'remotion';
import { RotatingTVScene } from './components/RotatingTVScene';
import { CTAScene } from './components';

const sisnemaColors = {
  primary: '#0066cc',
  secondary: '#00a8e8',
  accent: '#ff6b35',
  background: '#0a0a12',
  text: '#ffffff',
};

const sisnemaData = {
  title: 'SISNEMA',
  subtitle: 'Inovação e Conhecimento',
  description: 'Pioneiros em soluções de tecnologia e educação corporativa no Rio de Janeiro. Transformando carreiras desde 1995.',
  stats: [
    { label: 'Turmas Realizadas', value: '+3.830' },
    { label: 'Alunos Formados', value: '+54.000' },
    { label: 'Cursos Disponíveis', value: '+150' },
  ],
  features: [
    'Cursos Presenciais e Online',
    'Formações Microsoft e Linux',
    'Ciência de Dados e IA',
    'Projetos Corporativos',
    'Consultoria Especializada',
  ],
  courses: [
    'MAZ800: Windows Server Admin',
    'SS3187: Formação Linux (96h)',
    'MD102T: Microsoft 365 Admin',
    'SS3136: Redes Multiplataforma',
    'INEMA: Inteligência Artificial',
    'SS3546: Ciência de Dados',
    'SS3548: Data Science Avançado',
    'SS3567: Linux Shell Script',
  ],
  websiteUrl: 'sisnema.com.br',
  cta: {
    text: 'Matricule-se Agora',
    url: 'sisnema.com.br/cursos',
  },
};

/**
 * SisnemaShowcase - Vídeo promocional com TV rotativa
 *
 * Features:
 * - TV 3D com rotação contínua
 * - Contadores animados
 * - Scroll do site dentro da TV
 * - Partículas e efeitos visuais
 */
export const SisnemaShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: sisnemaColors.background }}>
      {/* Cena principal com TV rotativa */}
      <Sequence from={0} durationInFrames={270}>
        <RotatingTVScene
          title={sisnemaData.title}
          subtitle={sisnemaData.subtitle}
          description={sisnemaData.description}
          stats={sisnemaData.stats}
          features={sisnemaData.features}
          courses={sisnemaData.courses}
          colors={sisnemaColors}
          websiteUrl={sisnemaData.websiteUrl}
        />
      </Sequence>

      {/* CTA Final */}
      <Sequence from={270} durationInFrames={90}>
        <CTAScene
          title="Transforme sua carreira em TI"
          ctaText={sisnemaData.cta.text}
          ctaUrl={sisnemaData.cta.url}
          colors={sisnemaColors}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default SisnemaShowcase;
