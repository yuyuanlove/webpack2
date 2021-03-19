//loader本质上是一个函数

/**
 * 同步
 */
module.exports = function(content, map, meta){
    console.log(content,1)
    return content
    //this.callback(null, content, map, meta)  // return content = this.callback(null, content, map, meta)
}


module.exports.pitch =  function (){
    console.log('pitch 1')
}