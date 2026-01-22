/**
 * Script para capturar e analisar um site
 * Usado pelo Agent Browser para extrair dados do site
 *
 * Uso: Este script serve como referência para o Agent Browser
 * O Claude Code usa o agent-browser skill para executar essas ações
 */

import type { SiteData, ColorScheme, SiteStat } from './types';

// Instruções para o Agent Browser capturar um site:
export const captureInstructions = `
## Instruções para Captura de Site

### 1. Navegar até a URL
- Abrir a URL fornecida
- Aguardar carregamento completo (networkidle)
- Capturar screenshot da página inteira

### 2. Extrair Informações
- Título da página (tag title ou h1 principal)
- Meta description
- Textos de destaque (headlines, taglines)
- Estatísticas visíveis (números, métricas)
- Botões de CTA (Call to Action)

### 3. Analisar Esquema de Cores
- Cor de fundo principal
- Cor do texto principal
- Cores de destaque/accent
- Cores de botões/CTAs

### 4. Capturar Screenshots
- Screenshot full-page
- Screenshot do hero section
- Screenshot de seções importantes

### 5. Retornar Dados Estruturados
Retornar um JSON com a estrutura SiteData
`;

// Função para extrair cores dominantes de uma página
export const extractColorsScript = `
  // Script para executar no contexto da página
  const getComputedColors = () => {
    const body = document.body;
    const styles = getComputedStyle(body);

    // Encontrar elementos de destaque
    const buttons = document.querySelectorAll('button, a[href], .btn, [class*="button"]');
    const headings = document.querySelectorAll('h1, h2, h3');

    let primaryColor = '#6366f1';
    let accentColor = '#f59e0b';

    // Tentar extrair cor do primeiro botão
    if (buttons.length > 0) {
      const btnStyle = getComputedStyle(buttons[0]);
      if (btnStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        primaryColor = btnStyle.backgroundColor;
      }
    }

    return {
      background: styles.backgroundColor || '#0f0f0f',
      text: styles.color || '#ffffff',
      primary: primaryColor,
      accent: accentColor,
    };
  };

  getComputedColors();
`;

// Função para extrair estatísticas
export const extractStatsScript = `
  // Procurar por números/estatísticas na página
  const extractStats = () => {
    const stats = [];

    // Padrões comuns de estatísticas
    const patterns = [
      /(\d+[KMB+%]*)\\s*(users?|clients?|customers?|downloads?)/gi,
      /(\d+[KMB+%]*)\\s*(countries?|países)/gi,
      /(\\d+\\.\\d+%?)\\s*(uptime|disponibilidade)/gi,
      /(\d+\\.\\d+)\\s*★/gi,
    ];

    const text = document.body.innerText;

    // Encontrar elementos com números grandes
    const elements = document.querySelectorAll('[class*="stat"], [class*="metric"], [class*="number"]');
    elements.forEach(el => {
      const value = el.textContent?.trim();
      if (value && /\\d/.test(value)) {
        stats.push({ value, label: 'Métrica' });
      }
    });

    return stats.slice(0, 4);
  };

  extractStats();
`;

// Template de dados para quando não conseguir extrair
export const fallbackSiteData = (url: string): Partial<SiteData> => ({
  url,
  title: new URL(url).hostname.replace('www.', '').split('.')[0],
  description: 'Descubra uma nova forma de fazer as coisas',
  stats: [
    { label: 'Usuários', value: '10K+' },
    { label: 'Avaliação', value: '4.8★' },
  ],
  features: ['Rápido', 'Seguro', 'Confiável'],
  cta: { text: 'Saiba Mais', url },
});
