/* util
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-12-29 10:58:41
 */

const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;

/**
 * 获取uba客户端配置
 */
exports.getConfig = function () {
  let ubaConfig;
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