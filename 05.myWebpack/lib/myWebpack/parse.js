const fs = require('fs')
const babelParser = require('@babel/parser')
const path = require('path')
//插件收集依赖
const traverse = require('@babel/traverse').default
//编译插件
const { transformFromAst } = require('@babel/core')


const parser = {
    //获取抽象语法树
    getAst(filepath){
        const file = fs.readFileSync(filepath,'utf-8')
        //将其解析成ast抽象语法树
        const ast = babelParser.parse(file,{
            sourceType: "module"
        })    
        return ast
    },
    //获取依赖
    getDeps(filepath,ast){
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
        return deps
    },
    //将ast解析成code
    getCode(ast){
        //编译代码
        const { code } = transformFromAst(ast,null,{
            presets: ['@babel/preset-env']
        })
        return code
    }
}

module.exports = parser