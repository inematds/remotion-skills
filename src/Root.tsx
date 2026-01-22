import {Composition, Folder} from 'remotion';
import {MyAnimation as BarChartAnimation} from '../skills/remotion/rules/assets/charts-bar-chart';
import {MyAnimation as TypewriterAnimation} from '../skills/remotion/rules/assets/text-animations-typewriter';
import {MyAnimation as WordHighlightAnimation} from '../skills/remotion/rules/assets/text-animations-word-highlight';
import {PromoVideo, exampleSiteData} from './PromoVideo';
import {InemaShowcase} from './PromoVideo/InemaShowcase';
import type {SiteData} from './PromoVideo';

export const RemotionRoot = () => {
	return (
		<>
			{/* Vídeos Promocionais */}
			<Folder name="Promo-Videos">
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
					id="InemaClub"
					component={PromoVideo}
					durationInFrames={300}
					fps={30}
					width={1920}
					height={1080}
					defaultProps={{
						siteData: {
							url: 'https://inema.club',
							title: 'INEMA.CLUB',
							description: 'Crie sua Equipe, Seu Time. Nós Ajudamos. Prepare-se para o futuro com IA e Robótica.',
							stats: [
								{ label: 'Repositórios', value: '18+' },
								{ label: 'Canais Telegram', value: '20+' },
								{ label: 'Cursos', value: '4+' },
								{ label: 'Comunidade', value: '⭐' },
							],
							colors: {
								primary: '#6366f1',
								secondary: '#8b5cf6',
								accent: '#22c55e',
								background: '#0a0a0a',
								text: '#ffffff',
							},
							screenshots: [],
							features: [
								'Trilha para Iniciantes',
								'Comunidade Telegram',
								'Projetos Open-Source',
								'Formação em IA e Prompts',
							],
							cta: {
								text: 'Faça seu Cadastro',
								url: 'https://inema.vip',
							},
						},
					}}
				/>
				<Composition<{ siteData: SiteData }>
					id="InemaTV"
					component={InemaShowcase}
					durationInFrames={300}
					fps={30}
					width={1920}
					height={1080}
					defaultProps={{
						siteData: {
							url: 'https://inema.club',
							title: 'INEMA.CLUB',
							description: 'Crie sua Equipe, Seu Time. Nós Ajudamos. Prepare-se para o futuro com IA e Robótica.',
							stats: [
								{ label: 'Repositórios', value: '18+' },
								{ label: 'Canais Telegram', value: '20+' },
								{ label: 'Cursos', value: '4+' },
								{ label: 'Comunidade', value: '⭐' },
							],
							colors: {
								primary: '#6366f1',
								secondary: '#8b5cf6',
								accent: '#22c55e',
								background: '#0a0a0a',
								text: '#ffffff',
							},
							screenshots: [],
							features: [
								'Trilha para Iniciantes',
								'Comunidade Telegram',
								'Projetos Open-Source',
								'Formação em IA e Prompts',
							],
							cta: {
								text: 'Faça seu Cadastro',
								url: 'https://inema.vip',
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
