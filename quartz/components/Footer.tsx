import { i18n } from '../i18n'
import style from './styles/footer.scss'
import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from './types'

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ''}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{' '}
          <a href="https://quartz.jzhao.xyz/">Quartz v4.5.1</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
