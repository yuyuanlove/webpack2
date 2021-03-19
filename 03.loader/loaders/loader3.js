
const schema = require('./schema')

module.exports = function(content, map, meta){
    
    //获取options并且验证
    const options = this.getOptions(schema)

    console.log(content,options,3)
    return content
}