import * as babel from '@babel/core'
import babelPluginSmartCssModules, { useSmartCssModules } from '../src'
import { join } from 'path'

describe('babel', () => {
  const fixtureFile = join(__dirname, './__fixtures__/index.js')

  test('[useSmartCssModules] default', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [useSmartCssModules()],
    })
    expect(res?.code).toMatchSnapshot()
  })

  test('[babelPluginSmartCssModules] default', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [babelPluginSmartCssModules],
    })
    expect(res?.code).toMatchSnapshot()
  })

  test('[useSmartCssModules] custom exts', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [
        useSmartCssModules({
          exts: ['.less'],
        }),
      ],
    })
    expect(res?.code).toMatchSnapshot()
  })

  test('[babelPluginSmartCssModules] custom exts', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [
        [
          babelPluginSmartCssModules,
          {
            exts: ['.less'],
          },
        ],
      ],
    })
    expect(res?.code).toMatchSnapshot()
  })

  test('custom flag', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [
        useSmartCssModules({
          flag: 'MMM',
        }),
      ],
    })
    expect(res?.code).toMatchSnapshot()
  })

  test('set ignore', async () => {
    const res = await babel.transformFileAsync(fixtureFile, {
      plugins: [
        useSmartCssModules({
          ignore: /2/,
        }),
      ],
    })
    expect(res?.code).toMatchSnapshot()
  })
})
