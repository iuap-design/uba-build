/* uba-build
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2017-5-15 00:00:00
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-12-29 10:57:08
 */

const chalk = require("chalk");
const webpack = require("webpack");
const util = require("./util");
const webpackConfig = util.getConfig().prodConfig;

/**
 * 获取帮助
 */
function getHelp() {
  console.log(chalk.green(" Usage : "));
  console.log();
  console.log(chalk.green(" uba build"));
  console.log();
  process.exit(0);
}

/**
 * 获取version
 */
function getVersion() {
  console.log(chalk.green(require("../package.json").version));
  process.exit(0);
}

/**
 * 构建资源处理
 */
function build() {
  console.log();
  console.log(chalk.green(`********************************************`));
  console.log(chalk.yellow(` ❤️  uba-build`));
  console.log(chalk.green(` [core] : v${util.getPkg().version}`));
  console.log();
  console.log(chalk.green(` Good luck please wait`));
  console.log(chalk.green(`********************************************`));
  console.log();
  webpack(webpackConfig, function (err, stats) {
    if (!err) {
      console.log('\n' + stats.toString({
        hash: false,
        chunks: false,
        children: false,
        colors: true
      }));
    } else {
      console.log(chalk.red(err));
    }
  });
}

module.exports = {
  plugin: function (options) {
    commands = options.cmd;
    pluginname = options.name;
    if (options.argv.h || options.argv.help) {
      getHelp();
    }
    if (options.argv.v || options.argv.version) {
      getVersion();
    }

    build();

  }
}
