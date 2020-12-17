# babel-plugin-smart-css-modules

Automatic recognition of CSS Modules.

| Input                          | Output                                 |
| ------------------------------ | -------------------------------------- |
| `import './index.scss'`        | `import './index.scss'`                |
| `import _ from './index.css'`  | `import _ from './index.css?modules'`  |
| `import _ from './index.scss'` | `import _ from './index.scss?modules'` |
| `import _ from './index.less'` | `import _ from './index.less?modules'` |

## Support

| Framework | Support                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| Vue CLI   | ✅ &nbsp;[Native](https://github.com/vuejs/vue-cli/blob/master/packages/%40vue/cli-service/lib/config/css.js#L111) |
| UmiJS     | ✅ &nbsp;[Native](https://github.com/umijs/umi/blob/master/packages/bundler-webpack/src/getConfig/css.ts#L39)      |

## Install

```bash
npm i babel-plugin-smart-css-modules -D
```

## Usage

Add `babel-plugin-smart-css-modules` to `babel.config.js`:

```javascript
module.exports = {
  plugins: [
    require('babel-plugin-smart-css-modules').useSmartCssModules({
      // options
    }),
  ],
}
```

## Options

| Parameter | Type     | Description                             | Example               | Default                                                   |
| --------- | -------- | --------------------------------------- | --------------------- | --------------------------------------------------------- |
| exts      | string[] | The supported extensions.               |                       | `['.css', '.less', '.sass', '.scss', '.stylus', '.styl']` |
| flag      | string   | The query flag to identify CSS Modules. |                       | `modules`                                                 |
| ignore    | RegExp   | The RegExp of the ignored files.        | `/_variables\.scss$/` |                                                           |

## License

MIT (c) Jay Fong
