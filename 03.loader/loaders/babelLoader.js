const babelSchema = require('./babelSchema.json')
const babel = require('@babel/core')
const util = require('util')

//babel.transform用来编译代码，是一个普通的异步方法
//utils.promisity将babel.transform转化成基于promise的异步
const transform = util.promisify(babel.transform)

module.exports = function (content ,map, meta){

    const options = this.getOptions(babelSchema) || {}
    
    //校验通过
    //推荐异步任务
    const callback = this.async()

    //使用babel编译
    //将content按照options标准编译js
    transform(content,options).then(res => { 
        console.log(res)
        callback(null,res.code)
    }).catch(err => {
        callback(err)
    })

}