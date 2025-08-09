import type { QuartzConfig } from './quartz/cfg'
import * as Plugin from './quartz/plugins'

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Akrista's Rockery",
    pageTitleSuffix: '',
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: 'akrista',
      tagId: 'G-T9N81HHQ9T',
      projectId: 'smryfc548u',
    },
    locale: 'en-US',
    baseUrl: 'rockery.notakrista.com',
    ignorePatterns: ['private', 'templates', '.obsidian'],
    defaultDateType: 'modified',
    theme: {
      fontOrigin: 'googleFonts',
      cdnCaching: true,
      typography: {
        header: 'Schibsted Grotesk',
        body: 'Source Sans Pro',
        code: 'IBM Plex Mono',
      },
      colors: {
        darkMode: {
          light: '#282828',
          lightgray: '#3C3836',
          gray: '#928374',
          darkgray: '#BDAE93',
          dark: '#EBDBB2',
          secondary: '#F22B02',
          tertiary: '#FABD2F',
          highlight: 'rgba(184, 187, 38, 0.15)',
          textHighlight: '#B8BB2688',
        },
        lightMode: {
          light: '#FBF1C7',
          lightgray: '#EBDBB2',
          gray: '#928374',
          darkgray: '#3C3836',
          dark: '#282828',
          secondary: '#CC241D',
          tertiary: '#D79921',
          highlight: 'rgba(152, 151, 26, 0.15)',
          textHighlight: '#98971A88',
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ['frontmatter', 'git', 'filesystem'],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          dark: 'github-dark',
          light: 'github-light',
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: 'relative' }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: 'katex' }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
