const webpack = require('webpack');

module.exports = {
  publicPath: '',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/assets/sass/common/variables.scss';`
      },
      postcss: {
        plugins: [
          // 自动添加css前缀
          require('autoprefixer')({
            overrideBrowserslist: ['> 0.15% in CN']
          }),
        ]
      }
    }
  }
};
