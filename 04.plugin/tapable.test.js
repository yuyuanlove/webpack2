const {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook
} = require('tapable')

class Lesson {
    constructor(){
        //初始化hooks容器
        this.hooks = {
            // go: new SyncHook(['address'])
            go: new SyncBailHook(['address']), //有返回值就退出
            // leave: new AsyncParallelHook(['name','age']) //异步，并行
            leave: new AsyncSeriesHook(['name', 'age']) //异步串行
        }
    }
    tap(){
        //在hooks容器注册相应事件/添加回调函数
        this.hooks.go.tap('tapableStudy', (address)=> {
            console.log('tapableStudy',address)
            // return 111
        })
        this.hooks.go.tap('tapableStudy', (address) => {
            console.log('tapableStudy1', address)
        })
        this.hooks.leave.tapAsync('AsyncParallelHook', (name,age,cb) => {
            setTimeout(()=>{
                console.log('AsyncParallelHook', name, age)
                cb()
            },3000)
        })
        this.hooks.leave.tapAsync('AsyncParallelHook', (name, age, cb) => {
            setTimeout(() => {
                console.log('AsyncParallelHook1', name, age)
                cb()
            }, 2000)
        })
    }
    start(){
        //触发hooks
        this.hooks.go.call('tapableStart')
        this.hooks.leave.callAsync('lxy',18,()=>{
            //
            console.log('leave 事件结束 ～～～')
        })
    }
}

const lesson = new Lesson()

lesson.tap()
lesson.start()