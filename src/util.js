/* util
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-04-19 20:14:03
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