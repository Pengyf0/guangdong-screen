const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://ti8249.natappfree.cc',
        target: 'http://192.168.8.13:8083/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
})