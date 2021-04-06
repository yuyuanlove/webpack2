/**
 * 1.验证传入的值
 * 2.忽略文件夹下的不要目录
 * 3.读取剩下文件中的所以数据
 * 4.将这个数据全部转换成webpack资源
 * 5.输出
 */
const { validate } = require('schema-utils')
const Schema = require('./CopyWebpackPlugin.json')

const globby = require('globby')
const path = require('path')

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const { RawSource } = require('webpack').sources

class CopyWebpackPlugin{
    constructor(options = {}){
        validate(Schema, options, {
            name:'CopyWebpackPlugin'
        })
        //通过验证
        this.options = options
    }
    apply(compiler){
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin',(compilation)=>{
            // console.log(compiler)
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin',async (cb) => {
                //2
                const { from, to='.' ,ignore } = this.options
                //获取项目的根目录
                const context = compiler.options.context
                //也可以根据node进程参考
                // const context = process.cwd() 
                const isAbsolutePAth = path.isAbsolute(from) ? path.isAbsolute(from) : path.resolve(context,from)
                console.log(isAbsolutePAth)
                //globby(要处理的文件夹(要求是绝对路径),ignore)
                const paths = await globby(isAbsolutePAth,{ignore})
                console.log(paths)

                //步骤3
                const files = await Promise.all(
                    paths.map(async item => {
                        const filename = path.join(to,path.basename(item))
                        const data = await readFile(item)
                        return {                       
                            data,
                            filename
                        }
                    })
                )
                console.log(files)

                //步骤4
                const assets = files.map(item => {
                    const file = new RawSource(item.data)
                    return{
                        file,
                        filename: item.filename
                    }
                })

                //步骤5
                //emitAsset(资源名称，资源来源，附加资源信息)
                assets.forEach(item => {
                    compilation.emitAsset(item.filename,item.file)
                })

                cb()
            })
        })
    }
}

module.exports = CopyWebpackPlugin