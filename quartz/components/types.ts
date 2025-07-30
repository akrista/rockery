import type { Node } from 'hast'
import type { ComponentType, JSX } from 'preact'
import type { GlobalConfiguration } from '../cfg'
import type { QuartzPluginData } from '../plugins/vfile'
import type { BuildCtx } from '../util/ctx'
import type { StaticResources, StringResource } from '../util/resources'

export type QuartzComponentProps = {
  ctx: BuildCtx
  externalResources: StaticResources
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  children: (QuartzComponent | JSX.Element)[]
  tree: Node
  allFiles: QuartzPluginData[]
  displayClass?: 'mobile-only' | 'desktop-only'
} & JSX.IntrinsicAttributes & {
    [key: string]: any
  }

export type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: StringResource
  beforeDOMLoaded?: StringResource
  afterDOMLoaded?: StringResource
}

export type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent
