//@ts-ignore
//@ts-ignore
import rehypeTypst, { type Options as TypstOptions } from '@myriaddreamin/rehype-typst'
import type { KatexOptions } from 'katex'
import rehypeKatex from 'rehype-katex'
import rehypeMathjax, { type Options as MathjaxOptions } from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
import type { QuartzTransformerPlugin } from '../types'

interface Options {
  renderEngine: 'katex' | 'mathjax' | 'typst'
  customMacros: MacroType
  katexOptions: Omit<KatexOptions, 'macros' | 'output'>
  mathJaxOptions: Omit<MathjaxOptions, 'macros'>
  typstOptions: TypstOptions
}

interface MacroType {
  [key: string]: string
}

export const Latex: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const engine = opts?.renderEngine ?? 'katex'
  const macros = opts?.customMacros ?? {}
  return {
    name: 'Latex',
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      switch (engine) {
        case 'katex': {
          return [[rehypeKatex, { output: 'html', macros, ...(opts?.katexOptions ?? {}) }]]
        }
        case 'typst': {
          return [[rehypeTypst, opts?.typstOptions ?? {}]]
        }
        case 'mathjax': {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
        default: {
          return [[rehypeMathjax, { macros, ...(opts?.mathJaxOptions ?? {}) }]]
        }
      }
    },
    externalResources() {
      switch (engine) {
        case 'katex':
          return {
            css: [{ content: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css' }],
            js: [
              {
                // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
                src: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js',
                loadTime: 'afterDOMReady',
                contentType: 'external',
              },
            ],
          }
      }
    },
  }
}
