// vue.config.js
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: './dist',
  productionSourceMap: false,
  chainWebpack: config => {
    // 设置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
    // 导入公共scss文件，这样不用每个文件都去@import，方便引用变量
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: resolve('src/assets/css/common.scss')
          // Or array of paths
          // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        })
        .end()
    })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg')).add(resolve('../common/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')).add(resolve('../common/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: {
    externals: {
      // 'BMap': 'BMap'
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {

  },
  devServer: {
    port: 8080,
    proxy: 'http://lbi-edu.somibo.cn:18080'
  }
}
