import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import type sourceMapSupport from 'source-map-support'

export const options: sourceMapSupport.Options = {
  // source map hack to get around query param
  // import cache busting
  retrieveSourceMap(source) {
    if (source.includes('.quartz-cache')) {
      const realSource = fileURLToPath(`${source.split('?', 2)[0]}.map`)
      return {
        map: fs.readFileSync(realSource, 'utf8'),
      }
    } else {
      return null
    }
  },
}
