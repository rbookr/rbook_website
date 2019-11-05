const router = require('koa-router')()
var {scanBookGit} = require("../utils/index")
router.prefix('/update')

router.post('/',async (ctx,next)=>{
    
    let {token} = ctx.request.body

    if( token=== global.config.token){
        /* 更新git */
      try {
        await bookSystem.Repository.pull_master()
        await scanBookGit();
        ctx.body = "更新成功 " + (new Date()).toString()
      }
      catch(e){
        ctx.status = 500
        ctx.body = e
      }
        return
    }
    ctx.status = 500
    ctx.body = "不正确的token"
})

module.exports = router
