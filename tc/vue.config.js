const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  chainWebpack: (config) => {
    //删除编译后的独立js文件上的预获取操作
    config.plugins.delete("prefetch");
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: "gzip", //使用gzip压缩
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false, //是否删除原文件
          }),
        ],
      };
    }
  },
  //跨域
  // devServer: {
  //   proxy: {
  //     // "/": {
  //     //   target: `http://localhost:12321`,
  //     //   changeOrigin: true,
  //     // },
  //     "/socket.io": {
  //       target: "http://127.0.0.1:12321/", // target host
  //       changeOrigin: true, // needed for virtual hosted sites
  //       logLevel: "debug",
  //     },
  //     "/sockjs-node": {
  //       target: "http://127.0.0.1:12321",
  //       ws: false,
  //       changeOrigin: true,
  //     },
  //   },
  // },
};
