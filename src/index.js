/* uba build 2.0.0
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2018-04-27 22:56:07
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-04-27 22:56:10
 */

const chalk = require('chalk');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const webpack = require('webpack');
const util = require('./util');
const webpackConfig = require('./build.config');
const compiler = webpack(webpackConfig);


/**
 * build 主程序
 */
build = () => {
  console.log();
  console.log(chalk.green(`********************************************`));
  console.log(chalk.yellow(` ❤️  uba-build`));
  console.log(chalk.green(` [uba build] : v${util.getPkg().version}`));
  console.log();
  console.log(chalk.green(` Good luck please wait`));
  console.log(chalk.green(`********************************************`));
  console.log();
  compiler.run((err, stats) => {
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

//插件启动
module.exports = {
  //主程序uba调用插件Context
  plugin: (context) => {
    build();
  }
}
