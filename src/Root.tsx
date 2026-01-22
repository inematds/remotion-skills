import {Composition, Folder} from 'remotion';
import {MyAnimation as BarChartAnimation} from '../skills/remotion/rules/assets/charts-bar-chart';
import {MyAnimation as TypewriterAnimation} from '../skills/remotion/rules/assets/text-animations-typewriter';
import {MyAnimation as WordHighlightAnimation} from '../skills/remotion/rules/assets/text-animations-word-highlight';
import {PromoVideo, exampleSiteData} from './PromoVideo';
import type {SiteData} from './PromoVideo';

export const RemotionRoot = () => {
	return (
		<>
			{/* Vídeos Promocionais */}
			<Folder name="Promo Videos">
				<Composition
					id="PromoVideo"
					component={PromoVideo}
					durationInFrames={300}
					fps={30}
					width={1920}
					height={1080}
					defaultProps={{
						siteData: exampleSiteData,
					}}
				/>
				<Composition<{ siteData: SiteData }>
					id="PromoVideoCustom"
					component={PromoVideo}
					durationInFrames={300}
					fps={30}
					width={1920}
					height={1080}
					defaultProps={{
						siteData: {
							url: 'https://seusite.com',
							title: 'Seu Produto',
							description: 'Descrição incrível do seu produto',
							stats: [
								{ label: 'Usuários', value: '100K+' },
								{ label: 'Países', value: '50+' },
								{ label: 'Uptime', value: '99.9%' },
								{ label: 'Reviews', value: '4.9★' },
							],
							colors: {
								primary: '#3b82f6',
								secondary: '#8b5cf6',
								accent: '#f59e0b',
								background: '#0a0a0a',
								text: '#ffffff',
							},
							screenshots: [],
							features: [
								'Feature 1',
								'Feature 2',
								'Feature 3',
								'Feature 4',
							],
							cta: {
								text: 'Começar Agora',
								url: 'https://seusite.com/signup',
							},
						},
					}}
				/>
			</Folder>

			{/* Exemplos Originais */}
			<Folder name="Examples">
				<Composition
					id="BarChart"
					component={BarChartAnimation}
					durationInFrames={120}
					fps={30}
					width={1280}
					height={720}
				/>
				<Composition
					id="Typewriter"
					component={TypewriterAnimation}
					durationInFrames={180}
					fps={30}
					width={1920}
					height={1080}
					defaultProps={{
						fullText: 'From prompt to motion graphics. This is Remotion.',
						pauseAfter: 'From prompt to motion graphics.',
					}}
				/>
				<Composition
					id="WordHighlight"
					component={WordHighlightAnimation}
					durationInFrames={90}
					fps={30}
					width={1080}
					height={1080}
				/>
			</Folder>
		</>
	);
};
