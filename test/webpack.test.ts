import fs from 'fs-extra'
import webpack from 'webpack'
import { join } from 'path'
import { useSmartCssModules } from '../src'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getCssRule = (
  extraLoaders: webpack.RuleSetUseItem[] = [],
): webpack.RuleSetRule => ({
  oneOf: [
    {
      resourceQuery: /module/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: {
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
        },
        ...extraLoaders,
      ],
    },
    {
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
        },
        ...extraLoaders,
      ],
    },
  ],
})

describe('webpack', () => {
  const fixtureFile = join(__dirname, './__fixtures__/index.js')
  const outputDir = join(__dirname, './__output__/webpack')
  const outputFilename = 'index.js'
  const outputFile = join(outputDir, outputFilename)

  fs.ensureDirSync(outputDir)
  fs.emptyDirSync(outputDir)

  test('ok', async () => {
    await new Promise<webpack.Stats>((resolve, reject) => {
      webpack({
        mode: 'development',
        entry: fixtureFile,
        output: {
          path: outputDir,
          filename: outputFilename,
          libraryTarget: 'commonjs',
        },
        plugins: [new MiniCssExtractPlugin()],
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [
                    useSmartCssModules({
                      ignore: /2/,
                    }),
                  ],
                },
              },
            },
            {
              test: /\.css$/,
              ...getCssRule(),
            },
            {
              test: /\.less$/,
              ...getCssRule([
                {
                  loader: require.resolve('less-loader'),
                },
              ]),
            },
            {
              test: /\.scss$/,
              ...getCssRule([
                {
                  loader: require.resolve('sass-loader'),
                },
              ]),
            },
          ],
        },
      }).run((err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res!)
      })
    })
    const { default: styles } = await import(outputFile)
    expect(styles.css.button.startsWith('button')).toBeTrue()
    expect(styles.scss.button.startsWith('button')).toBeTrue()
    expect(styles.less).toBeUndefined()
  })
})
