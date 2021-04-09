const fs = require('fs')
const path = require('path')
//将代码解析成抽象语法树
const babelParser = require('@babel/parser')
//插件收集依赖
const traverse = require('@babel/traverse').default
//编译插件
const { transformFromAst } = require('@babel/core')


class Compiler {
    constructor(options = {}){
        this.options = options
    }
    //启动webpck打包
    run(){
        //读取入口文件
        const filepath = this.options.entry
        const file = fs.readFileSync(filepath,'utf-8')
        //将其解析成ast抽象语法树
        const ast = babelParser.parse(file,{
            sourceType: "module"
        })        
        //获取文件夹路径
        const dirname = path.dirname(filepath)
        const deps = {}
        //收集依赖
        traverse(ast,{
            //遍历内部ast.program.body,如果每一个数组的type是ImportDeclaration执行
            ImportDeclaration({ node }){
                const relativePath = node.source.value
                //生成绝对路径
                const absolutePath = path.resolve(dirname,relativePath)
                deps[relativePath] = absolutePath
            }
        })
        console.log(deps)
        //编译代码
        const { code } = transformFromAst(ast,null,{
            presets: ['@babel/preset-env']
        })
    }
}
function myWebpack(config){
    return new Compiler(config)
}

module.exports = myWebpack