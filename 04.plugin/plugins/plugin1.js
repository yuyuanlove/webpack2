
//plugin 是一个类
//生命周期钩子函数，是由 compiler 暴露

class Plugin1 {
    apply(complier){
        complier.hooks.emit.tap('Plugin1',(com) => {
            console.log('emit.tap 1111')
        })
        complier.hooks.emit.tapAsync('Plugin1', (com, cb) => {
            setTimeout(()=>{
                console.log('emit.tapAsync 1111')
                cb()
            },1000)
        })
        complier.hooks.emit.tapPromise('Plugin1', (com) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('emit.tapPromise 1111')
                    resolve()
                }, 1000)
            })
        })
        complier.hooks.afterEmit.tap('Plugin1', (com) => {
            console.log('afterEmit.tap 2222')
        })
    }
}

module.exports = Plugin1