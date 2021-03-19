//loader本质上是一个函数

// module.exports = function(content, map, meta){
//     console.log(content,2)
//     return content
// }

/**
 * 异步
 */
 module.exports = function(content, map, meta){
    console.log(content,2)
    
    const callback = this.async()
    setTimeout(()=>{
        callback(null, content, map, meta) 
    },1000)

}

//事件是顺序执行
module.exports.pitch =  function (){
    console.log('pitch 2')
}