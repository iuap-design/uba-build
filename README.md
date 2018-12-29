# uba-build

[![npm version](https://img.shields.io/npm/v/uba-build.svg)](https://www.npmjs.com/package/uba-build)
[![devDependency Status](https://img.shields.io/david/dev/tinper-uba/uba-build.svg)](https://david-dm.org/tinper-uba/uba-build#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dt/uba-build.svg?style=flat)](https://npmjs.org/package/uba-build)

---

[![NPM](https://nodei.co/npm/uba-build.png)](https://nodei.co/npm/uba-build/)

---

## 介绍

基于 [uba](https://github.com/iuap-design/tinper-uba/) 集成开发工具扩展的插件，可以帮助我们构建uba前端项目。


## 安装


```bash
$ npm install uba -g
```

无需单独安装，安装`uba`工具内置集成。

工具是依赖在开发框架内去使用的，具体参考开发框架里的`package.json`的启动脚本命令，配合`uba.config.js`文件使用


## 参数

下面是在配置script命令传入的参数如下：

```bash
  "scripts": {
    "build": "uba build --noProcess"
  }
```

名称 | 说明
---|---
noProcess | 不显示构建进度
