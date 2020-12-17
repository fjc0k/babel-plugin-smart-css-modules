import { extname } from 'path'
import type { PluginObj } from '@babel/core'

export interface Options {
  /**
   * The supported extensions.
   *
   * @default ['.css', '.less', '.sass', '.scss', '.stylus', '.styl']
   */
  exts?: string[]

  /**
   * The query flag to identify CSS Modules.
   *
   * @default 'modules'
   */
  flag?: string

  /**
   * The RegExp of the ignored files.
   *
   * @example /_variables\.scss$/
   */
  ignore?: RegExp
}

export function babelPluginSmartCssModules(
  _: any,
  {
    exts = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'],
    flag = 'modules',
    ignore,
  }: Options = {},
): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const {
          specifiers,
          source,
          source: { value },
        } = path.node
        if (
          specifiers.length &&
          exts.includes(extname(value)) &&
          (ignore ? !ignore.test(value) : true)
        ) {
          source.value = `${source.value}?${flag}`
        }
      },
    },
  }
}

export function useSmartCssModules(options?: Options): PluginObj {
  return babelPluginSmartCssModules(null, options)
}

export default babelPluginSmartCssModules
