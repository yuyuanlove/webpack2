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
            name: 'CopyWebpackPlugin'
        })

        this.options = options
    }

    apply(compiler){
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            //添加资源的hooks
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin',async (cb) => {
                const { from, ignore } = this.options
                const to = this.options.to || '.'
                //1.过滤需要忽略的文件
                //globby(要处理的文件夹(要求是绝对路径)，options)
                const context = compiler.options.context
                const isAbsoluteFrom = path.isAbsolute('from') ? path.isAbsolute('from') : path.resolve(context,from)
                // console.log(isAbsoluteFrom)
                const paths = await globby(isAbsoluteFrom, { ignore })
                // console.log(paths)

                
                //2.读取from中的所有资源，fs
                const files = await Promise.all(
                    paths.map(async item => {
                        const data = await readFile(item)
                        const filename = path.join(to, path.basename(item))

                        return{
                            data,
                            filename
                        }
                    })
                )
                //3.生成webpack格式的资源
                const assets = files.map(file => {
                    const source = new RawSource(file.data)
                    return {
                        source,
                        filename: file.filename
                    }
                })

                //4.添加到compilation中输出
                assets.forEach(item => {
                    compilation.emitAsset(item.filename, item.source)
                })

                cb()
            })
        })
    }
}

module.exports = CopyWebpackPlugin