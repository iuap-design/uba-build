/* util
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2018-10-10 15:21:21
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-10-10 15:21:24
 */

var path = require("path");
var chalk = require("chalk");
var webpack = require("webpack");
var argv = require("minimist")(process.argv.slice(2));
var commands = argv;

exports.getConfig = function () {
  var ubaConfig;
  try {
    ubaConfig = require(path.resolve(".", "uba.config.js"));
    !commands.noProcess && ubaConfig.prodConfig.plugins.push(new webpack.ProgressPlugin());
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