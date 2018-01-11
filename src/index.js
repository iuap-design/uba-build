/* uba v3
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2018-01-10 18:58:38
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2018-01-10 18:58:41
 */


const chalk = require("chalk");
const webpack = require("webpack");
const util = require("./util");
const webpackConfig = require("./pack");


/**
 * dev server 主程序
 */
build = opt => {
  console.log();
  console.log(chalk.green(`********************************************`));
  console.log(chalk.yellow(` ❤️  uba-build-server`));
  console.log(chalk.green(` [uba build] : v${util.getPkg().version}`));
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


//插件启动
module.exports = {
  //主程序uba调用插件Context
  plugin: (context) => {
    build(context);
  }
}
