# Remotion Skills

Biblioteca de referência e recursos educacionais para **Remotion** - um framework JavaScript/React para criar vídeos programaticamente.

## Sobre

Este repositório contém:

- **28 guias de boas práticas** para desenvolvimento com Remotion
- **3 exemplos de animações** funcionais (BarChart, Typewriter, WordHighlight)
- **PromoVideo** - Sistema para criar vídeos promocionais a partir de URLs de sites

## Instalação

```bash
# Clonar o repositório
git clone git@github.com:inematds/remotion-skills.git
cd remotion-skills

# Instalar dependências
npm install

# Iniciar o Remotion Studio
npm run dev
```

## Tech Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Remotion | 4.0.0 | Framework de vídeo |
| React | 18+ | Componentes UI |
| TypeScript | - | Tipagem |
| Three.js | - | Suporte 3D |
| Lottie | - | Animações |
| Google Fonts | - | Fontes |

## Estrutura do Projeto

```
remotion-skills/
├── src/
│   ├── index.ts                    # Ponto de entrada
│   ├── Root.tsx                    # Composições Remotion
│   └── PromoVideo/                 # Sistema de vídeos promocionais
│       ├── types.ts                # Tipos TypeScript
│       ├── capture-site.ts         # Instruções para Agent Browser
│       ├── PromoVideo.tsx          # Composição principal
│       ├── index.ts
│       └── components/
│           ├── IntroScene.tsx      # Cena de abertura
│           ├── StatsScene.tsx      # Estatísticas animadas
│           ├── FeaturesScene.tsx   # Lista de features
│           ├── CTAScene.tsx        # Call to action
│           ├── Transition.tsx      # Transições entre cenas
│           └── index.ts
│
├── skills/remotion/
│   ├── SKILL.md                    # Índice de documentação
│   └── rules/                      # 28 guias de boas práticas
│       ├── assets/                 # Exemplos de código
│       │   ├── charts-bar-chart.tsx
│       │   ├── text-animations-typewriter.tsx
│       │   └── text-animations-word-highlight.tsx
│       ├── animations.md
│       ├── compositions.md
│       ├── timing.md
│       └── ... (25 mais guias)
│
├── package.json
├── tsconfig.json
└── README.md
```

## Composições Disponíveis

### Promo Videos

| ID | Descrição | Duração | Resolução |
|----|-----------|---------|-----------|
| `PromoVideo` | Vídeo promocional com dados de exemplo | 10s | 1920x1080 |
| `PromoVideoCustom` | Vídeo promocional customizável | 10s | 1920x1080 |

### Examples

| ID | Descrição | Duração | Resolução |
|----|-----------|---------|-----------|
| `BarChart` | Gráfico de barras animado | 4s | 1280x720 |
| `Typewriter` | Efeito máquina de escrever | 6s | 1920x1080 |
| `WordHighlight` | Destaque de palavras | 3s | 1080x1080 |

## Guias de Boas Práticas

### Conceitos Fundamentais

| Guia | Descrição |
|------|-----------|
| [animations.md](skills/remotion/rules/animations.md) | Fundamentos de animação baseada em frames |
| [compositions.md](skills/remotion/rules/compositions.md) | Definição de composições, pastas, stills |
| [timing.md](skills/remotion/rules/timing.md) | Interpolação, easing, animações spring |
| [sequencing.md](skills/remotion/rules/sequencing.md) | Padrões de sequenciamento |

### Mídia e Assets

| Guia | Descrição |
|------|-----------|
| [assets.md](skills/remotion/rules/assets.md) | Importação de imagens, vídeos, áudio, fontes |
| [images.md](skills/remotion/rules/images.md) | Embedding de imagens |
| [videos.md](skills/remotion/rules/videos.md) | Playback de vídeo, trimming, volume, velocidade |
| [audio.md](skills/remotion/rules/audio.md) | Manipulação de áudio |
| [fonts.md](skills/remotion/rules/fonts.md) | Google Fonts e fontes locais |

### Conteúdo Visual

| Guia | Descrição |
|------|-----------|
| [3d.md](skills/remotion/rules/3d.md) | Three.js e React Three Fiber |
| [charts.md](skills/remotion/rules/charts.md) | Visualização de dados e gráficos |
| [gifs.md](skills/remotion/rules/gifs.md) | Sincronização de GIFs |
| [lottie.md](skills/remotion/rules/lottie.md) | Animações Lottie |
| [tailwind.md](skills/remotion/rules/tailwind.md) | Integração com TailwindCSS |

### Texto e Legendas

| Guia | Descrição |
|------|-----------|
| [text-animations.md](skills/remotion/rules/text-animations.md) | Animações de texto (typewriter, highlight) |
| [display-captions.md](skills/remotion/rules/display-captions.md) | Exibição de legendas estilo TikTok |
| [import-srt-captions.md](skills/remotion/rules/import-srt-captions.md) | Importação de arquivos .srt |
| [transcribe-captions.md](skills/remotion/rules/transcribe-captions.md) | Transcrição de áudio para legendas |
| [measuring-text.md](skills/remotion/rules/measuring-text.md) | Medição de dimensões de texto |

### Tópicos Avançados

| Guia | Descrição |
|------|-----------|
| [transitions.md](skills/remotion/rules/transitions.md) | Transições entre cenas |
| [trimming.md](skills/remotion/rules/trimming.md) | Técnicas de trimming |
| [measuring-dom-nodes.md](skills/remotion/rules/measuring-dom-nodes.md) | Medição de elementos DOM |
| [calculate-metadata.md](skills/remotion/rules/calculate-metadata.md) | Metadados dinâmicos |
| [extract-frames.md](skills/remotion/rules/extract-frames.md) | Extração de frames de vídeos |
| [can-decode.md](skills/remotion/rules/can-decode.md) | Detecção de codec de vídeo |
| [get-video-duration.md](skills/remotion/rules/get-video-duration.md) | Obter duração de vídeo |
| [get-video-dimensions.md](skills/remotion/rules/get-video-dimensions.md) | Obter dimensões de vídeo |
| [get-audio-duration.md](skills/remotion/rules/get-audio-duration.md) | Obter duração de áudio |

## PromoVideo - Vídeos Promocionais

Sistema para criar vídeos promocionais automaticamente a partir de dados de um site.

### Estrutura do Vídeo

O vídeo tem 10 segundos (300 frames a 30fps) dividido em:

1. **Intro (0-3s)** - Título, descrição e screenshot do site
2. **Stats (3-5.5s)** - Estatísticas animadas (usuários, países, etc.)
3. **Features (5.5-8s)** - Lista de features com checkmarks
4. **CTA (8-10s)** - Call to action final

### Tipos de Dados

```typescript
interface SiteData {
  url: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  screenshots: string[];
  features: string[];
  cta: { text: string; url: string };
}
```

### Uso com Claude Code + Agent Browser

1. Forneça uma URL de site
2. O Agent Browser captura screenshots e analisa cores
3. Dados são extraídos (título, stats, features)
4. O vídeo é gerado automaticamente
5. Agent Browser pode assistir e dar feedback para melhorias

## Comandos

```bash
# Desenvolvimento
npm run dev              # Inicia Remotion Studio

# Renderização
npx remotion render PromoVideo out/promo.mp4
npx remotion render BarChart out/chart.mp4
npx remotion render Typewriter out/typewriter.mp4
```

## Regras Importantes do Remotion

| Fazer | Não Fazer |
|-------|-----------|
| Usar `useCurrentFrame()` | CSS animations/transitions |
| Usar `interpolate()` ou `spring()` | `setTimeout` ou `setInterval` |
| Assets via `staticFile()` | URLs externas sem tratamento |
| Tipo `type` para props | `interface` para props de composição |

### Exemplo Básico

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const MyAnimation = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <h1>Hello Remotion!</h1>
    </AbsoluteFill>
  );
};
```

## Dependências

```json
{
  "remotion": "^4.0.0",
  "@remotion/cli": "^4.0.0",
  "@remotion/bundler": "^4.0.0",
  "@remotion/shapes": "^4.0.0",
  "@remotion/three": "^4.0.0",
  "@remotion/lottie": "^4.0.0",
  "@remotion/google-fonts": "^4.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## Links Úteis

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## Licença

Este projeto é baseado no template oficial do Remotion.

---

Criado com Remotion e Claude Code
