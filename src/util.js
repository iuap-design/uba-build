/* util
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-01-29 21:51:11
 */

var path = require("path");
var chalk = require("chalk");
var webpack = require("webpack");

exports.getConfig = function () {
    var ubaConfig;
  try {
    ubaConfig = require(path.resolve(".", "uba.config.js"));
    ubaConfig.prodConfig.plugins.push(new webpack.ProgressPlugin());
    //ubaConfig.prodConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  } catch (e) {
    console.log(chalk.red(e));
    console.log(chalk.yellow("Please check uba.config.js configuration file"));
    process.exit(0);
  }
  return ubaConfig;
}

/**
 * 获取package.json
 */
exports.getPkg = () => {
  return require("../package.json");
}