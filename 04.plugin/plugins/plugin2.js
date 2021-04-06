
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const path = require('path')
const { RawSource } = require('webpack').sources

class Plugin2 {
    apply(compiler){
        compiler.hooks.thisCompilation.tap('Plugin2', (compilation,compilationParams) => {
            debugger
            compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
                const content = 'hello Plugin2 test'
                compilation.assets['ass.txt'] = {
                    size(){
                        return content.length
                    },
                    source(){
                        return content
                    }
                }

                const data = await readFile(path.resolve(__dirname,'test.txt'))
                compilation.assets['b.txt'] = new RawSource(data)

                cb()
            })
        })
    }
}

module.exports = Plugin2