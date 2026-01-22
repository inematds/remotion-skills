import { AbsoluteFill, Sequence } from 'remotion';
import { TVShowcaseScene } from './components/TVShowcaseScene';
import { CTAScene } from './components';
import type { SiteData } from './types';

interface InemaShowcaseProps {
  siteData: SiteData;
}

/**
 * InemaShowcase - Vídeo promocional com layout TV
 *
 * Layout:
 * - Esquerda: Informações descendo (título, stats, features)
 * - Direita: TV inclinada mostrando o site com scroll
 */
export const InemaShowcase: React.FC<InemaShowcaseProps> = ({ siteData }) => {
  const { title, description, stats, colors, features, cta, url, screenshots } = siteData;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Cena principal com TV */}
      <Sequence from={0} durationInFrames={240}>
        <TVShowcaseScene
          title={title}
          description={description}
          stats={stats}
          features={features}
          colors={colors}
          screenshotUrl={screenshots[0]}
          websiteUrl={url}
        />
      </Sequence>

      {/* CTA Final */}
      <Sequence from={240} durationInFrames={60}>
        <CTAScene
          title="Comece sua jornada agora!"
          ctaText={cta.text}
          ctaUrl={cta.url}
          colors={colors}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default InemaShowcase;
