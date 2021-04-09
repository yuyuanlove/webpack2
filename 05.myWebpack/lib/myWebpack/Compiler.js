const {getAst,getDeps,getCode} = require('./parse')
const fs = require('fs')
const path = require('path')
class Compiler {
    constructor(options = {}){
        this.options = options
        //所以依赖容器
        this.modules = []
    }
    //启动webpck打包
    run(){
        //读取入口文件
        const filepath = this.options.entry
        //第一次构建，得到入口文件信息
        const fileInfo = this.build(filepath)
        this.modules.push(fileInfo)
        const getDepsMethod = (deps) => {
            for (const key in deps) {
                const fileInfo = this.build(deps[key])
                this.modules.push(fileInfo)
                if(JSON.stringify(fileInfo.deps) != '{}'){
                    getDepsMethod(fileInfo.deps)
                }
            }
        }
        //递归依赖
        getDepsMethod(fileInfo.deps)

        console.log(this.modules)
        //将依赖整理成更好的依赖表
        const depsChart =  this.modules.reduce((data,value) => {
            return {
                ...data,
                [value.filepath]:{
                    code:value.code,
                    deps: value.deps
                }
            }
        },{})
        this.generate(depsChart)

    }
    //开始构建
    build(filepath){
        const ast = getAst(filepath)
        const deps = getDeps(filepath,ast)
        const code = getCode(ast)

        return{
            filepath,
            deps,
            code
        }
    }

    //生成输出资源
    generate(depsChart){
        const bundle=`(function(depsChart){
            function require(module){
                function localRequire(relativePath){
                   return require(depsChart[module].deps[relativePath])//递归解析
                }
                var exports={};
                (function(require,exports,code){
                 eval(code)
                })(localRequire,exports,depsChart[module].code)
                return exports
            }
            require('${this.options.entry}')
        })(${JSON.stringify(depsChart)})`

        const filePath = path.resolve(this.options.output.path,this.options.output.filename)
        fs.writeFileSync(filePath,bundle,'utf-8')
    }
}

module.exports = Compiler