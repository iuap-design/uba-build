var chalk = require("chalk");
var path = require("path");

var webpack = require("webpack");

function getHelp() {
  console.log(chalk.green(" Usage : "));
  console.log();
  console.log(chalk.green(" uba build"));
  console.log();
  process.exit(0);
}

function getVersion() {
  console.log(chalk.green(require("../package.json").version));
  process.exit(0);
}

function build() {
  console.log("Operation now, please wait");
  var webpackConfig = require("./webpack.base");
  webpack(webpackConfig, function(err, stats) {
    if(!err){
      console.log('\n' + stats.toString({
          hash: false,
          chunks: false,
          children: false,
          colors: true
      }));
      console.log("\n uba build success!");
    }else{
      console.log(err);
    }
  });
}

module.exports = {
  plugin: function(options) {
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
