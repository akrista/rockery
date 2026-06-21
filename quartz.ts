import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig({
  analytics: {
    provider: "google",
    tagId: "G-T9N81HHQ9T",
  },
})
export default config
export const layout = await loadQuartzLayout()
