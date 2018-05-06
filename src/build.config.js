/**
 * @description develop
 */

const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const util = require('./util');
const base = require('./base.config');
const cfg = util.getUbaConfig()();

//默认的配置用于merge操作
const config = {
    devtool: cfg.devtool ? cfg.devtool : "source-map",
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    output: cfg.output,
    externals: cfg.externals,
    resolve: cfg.resolve,
    module: {
      rules: cfg.loader
    },
    plugins: []
  }

  //传入插件设置
  !commands.noProcess && config.plugins.push(new webpack.ProgressPlugin());
config.plugins = config.plugins.concat(cfg.buildPlugins);

//当前应用模式 单页
if (cfg.appType === 'single') {
  config['entry'] = cfg.entry;
  //设置一次HTML插件
  config['plugins'].push(new HtmlWebpackPlugin(Object.assign({
    template: "./src/index.html",
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }, cfg.html)));
} else if (cfg.appType === 'multi') { //多页模式
  let entries = {};
  config['entry'] = {};
  //按照传入glob参数匹配扫描
  glob.sync(cfg.entry).forEach(path => {
    const chunk = path.split("./src/pages/")[1].split("/index.js")[0];
    entries[`${chunk}`] = path;
    let htmlConfig = {
      template: `./src/pages/${chunk}/index.html`,
      chunks: ['manifest', 'vendor', 'commons', chunk],
      chunksSortMode: "manual",
      filename: `${chunk}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    };
    config['plugins'].push(new HtmlWebpackPlugin(Object.assign(htmlConfig, cfg.html)));
  });
  config['entry'] = entries;
}


module.exports = merge(base, config);
