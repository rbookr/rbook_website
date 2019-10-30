/* redis-cache */
/*!  redis 相应的操作
 * @author rainboy
 */
const Redis = require("ioredis")

function redis_class({addr='redis://localhost',opts={}}){

    this.redisOpts = Object.assign({ lasyConnet:true},opts)

    this.redis = new Redis(addr,this.redisOpts)
    this.redis.connect(()=>{
        debug(`redis 连接建立成功`)
    })
}


/*!
 * 设定缓存,
 * 默认时间 60s
 * @author rainboy
 */
redis_class.prototype.set = function(key,str,time=60){
    return this.redis.setex(key,time,str)
}
redis_class.prototype.get = function(key){
    return this.redis.get(key).then( cache =>{
      if(!cache)
        return null
      return cache
    })
}


module.exports = redis_class

