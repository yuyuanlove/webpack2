const {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook
} = require('tapable')

class Lesson{
    constructor(){
        //初始化hooks
        this.hooks = {
            course2: new AsyncParallelHook(['type']), //异步并行
            course3: new AsyncSeriesHook(['type']),
        }
    }
    tap(){
        //AsyncParallelHook
        this.hooks.course2.tapAsync('course2',(type, cb) => {
            setTimeout(() => {
                console.log('course21:'+type)
                cb()
            }, 2000)
        })
        this.hooks.course2.tapAsync('course2',(type, cb) => {
            setTimeout(() => {
                console.log('course22:'+type)
                cb()
            }, 1000)
        })
        //AsyncSeriesHook
    }
    start(){
        this.hooks.course2.callAsync('chinese', () => {
            console.log('course2 end~~~')
        })
    }
}

const lesson = new Lesson()
lesson.tap()
lesson.start()