const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = env => {
  let uba = {
    config: {
      plugins: {
        static: {
          root: "static"
        },
        mock: {
          file: "uba.mock.js"
        },
        proxy: [{
          router: "/api/*",
          target: "https://cnodejs.org"
        }, {
          router: ["/users/*", "/orgs/*"],
          target: "https://api.github.com"
        }]
      },
      css: {
        name: "[name].[hash:8].css"
      },
      html: {
        xhtml: true,
        inject: "body",
        hash: env.production,
        filename: 'index.html',
        template: "./view/index.html"
      },
      js: {
        min: env.production,
        optimize: true,
        opt: {
          test: /\.js($|\?)/i
        },
        name: "vendor",
        filename: "[name].[hash:8].js"
      },
      img: {
        limit: 8192,
        name: "images/[name].[hash:8].[ext]"
      }
    },
    pack: {
      devtool: env.production ? "cheap-module-source-map" : "cheap-module-eval-source-map",
      entry: {
        app: env.production ? "./entry" : ["./entry", env.HMR]
      },
      output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].[hash:8].bundle.js',
        publicPath: "/"
      },
      resolve: {
        extensions: [
          ".json"
        ],
        alias: {
          pages: path.resolve(__dirname, "src/pages/")
        }
      },
      plugins: []
    }
  }
  if (env.production) {
    uba.pack.plugins.push(new CleanWebpackPlugin("public"))
  }
  return uba;
}