const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://ti8249.natappfree.cc',
  //         pathRewrite: {
  //           '^/api': ''
  //         },
  //       changeOrigin: true
  //     }
  //   }
  // }
})