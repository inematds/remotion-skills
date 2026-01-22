import { AbsoluteFill, Sequence } from 'remotion';
import {
  IntroScene,
  StatsScene,
  FeaturesScene,
  CTAScene,
  Transition,
} from './components';
import type { SiteData } from './types';
import { exampleSiteData } from './types';

interface PromoVideoProps {
  siteData?: SiteData;
}

/**
 * PromoVideo - Vídeo promocional gerado a partir de dados de um site
 *
 * Estrutura do vídeo (300 frames = 10 segundos a 30fps):
 * - Intro (0-90): Título, descrição e screenshot
 * - Transição (85-100)
 * - Stats (90-165): Estatísticas animadas
 * - Transição (160-175)
 * - Features (165-240): Lista de features
 * - Transição (235-250)
 * - CTA (240-300): Call to action final
 */
export const PromoVideo: React.FC<PromoVideoProps> = ({
  siteData = exampleSiteData,
}) => {
  const { title, description, stats, colors, screenshots, features, cta } = siteData;

  // Duração de cada cena (em frames)
  const INTRO_START = 0;
  const INTRO_DURATION = 90;

  const STATS_START = 90;
  const STATS_DURATION = 75;

  const FEATURES_START = 165;
  const FEATURES_DURATION = 75;

  const CTA_START = 240;
  const CTA_DURATION = 60;

  const TRANSITION_DURATION = 15;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Cena 1: Intro */}
      <Sequence from={INTRO_START} durationInFrames={INTRO_DURATION}>
        <IntroScene
          title={title}
          description={description}
          colors={colors}
          screenshotUrl={screenshots[0]}
        />
      </Sequence>

      {/* Transição 1 */}
      <Sequence from={INTRO_DURATION - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION}>
        <Transition type="wipe" colors={colors} duration={TRANSITION_DURATION} />
      </Sequence>

      {/* Cena 2: Stats */}
      <Sequence from={STATS_START} durationInFrames={STATS_DURATION}>
        <StatsScene stats={stats} colors={colors} />
      </Sequence>

      {/* Transição 2 */}
      <Sequence from={STATS_START + STATS_DURATION - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION}>
        <Transition type="zoom" colors={colors} duration={TRANSITION_DURATION} />
      </Sequence>

      {/* Cena 3: Features */}
      <Sequence from={FEATURES_START} durationInFrames={FEATURES_DURATION}>
        <FeaturesScene features={features} colors={colors} />
      </Sequence>

      {/* Transição 3 */}
      <Sequence from={FEATURES_START + FEATURES_DURATION - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION}>
        <Transition type="slide" colors={colors} duration={TRANSITION_DURATION} />
      </Sequence>

      {/* Cena 4: CTA */}
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAScene
          title="Pronto para começar?"
          ctaText={cta.text}
          ctaUrl={cta.url}
          colors={colors}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default PromoVideo;
