import sharp from 'sharp'
import type { BuildCtx } from '../../util/ctx'
import { type FullSlug, joinSegments, QUARTZ } from '../../util/path'
import type { QuartzEmitterPlugin } from '../types'
import { write } from './helpers'

export const Favicon: QuartzEmitterPlugin = () => ({
  name: 'Favicon',
  async *emit({ argv }) {
    const iconPath = joinSegments(QUARTZ, 'static', 'icon.png')

    const faviconContent = sharp(iconPath).resize(48, 48).toFormat('png')

    yield write({
      ctx: { argv } as BuildCtx,
      slug: 'favicon' as FullSlug,
      ext: '.ico',
      content: faviconContent,
    })
  },
  async *partialEmit() {},
})
