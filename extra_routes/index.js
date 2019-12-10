
const router = require('koa-router')()
router.prefix('/')

var {extra_routes}  = global.config

for( let route of extra_routes){
  debug(`    ==> ${route.name}, url: /${route.url}`)
  router[ route.method || 'get']("/"+route.url,async (ctx,next)=>{
    return require('./'+route.name)(ctx,next,route.opts || {})
  })
}

module.exports = router
