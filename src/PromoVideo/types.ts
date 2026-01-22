// Tipos para o vídeo promocional baseado em URL

export interface SiteData {
  url: string;
  title: string;
  description: string;
  stats: SiteStat[];
  colors: ColorScheme;
  screenshots: string[];
  features: string[];
  cta: {
    text: string;
    url: string;
  };
}

export interface SiteStat {
  label: string;
  value: string;
  icon?: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface PromoVideoProps {
  siteData: SiteData;
}

// Dados de exemplo para desenvolvimento
export const exampleSiteData: SiteData = {
  url: 'https://exemplo.com',
  title: 'Sua Plataforma Incrível',
  description: 'Transforme suas ideias em realidade com nossa solução completa',
  stats: [
    { label: 'Usuários Ativos', value: '50K+' },
    { label: 'Países', value: '120+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Avaliação', value: '4.9★' },
  ],
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#0f0f0f',
    text: '#ffffff',
  },
  screenshots: [],
  features: [
    'Interface Intuitiva',
    'Integração Fácil',
    'Suporte 24/7',
    'Segurança Avançada',
  ],
  cta: {
    text: 'Comece Agora',
    url: 'https://exemplo.com/signup',
  },
};
