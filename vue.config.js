module.exports = {
  // publicPath: '/new/',
  css: {
      loaderOptions: {
          sass: {
              additionalData: `@import "@/assets/common.scss";`
          }
      }
  },
  devServer: {
      open: true,
  //     proxy: {
  //         '^/appstore': {
  //             target: 'http://10.100.31.74:8080',
  //             changeOrigin: true,
  //             ws: false,
  //             pathRewrite: {
  //                 '^/appstore': '/appstore'
  //             }
  //         },
  //         '^/': {
  //             target: 'http://113.57.176.79:8387',
  //             changeOrigin: true,
  //             ws: false,
  //             pathRewrite: {
  //                 '^/': ''
  //             }
  //         },
  //     }
  }
}