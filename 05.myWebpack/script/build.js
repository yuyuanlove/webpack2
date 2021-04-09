const myWebpack = require('../lib/myWebpack/index.js')
const config = require('../config/webpack.config')

const compiler = myWebpack(config)
//开始打包
compiler.run()

