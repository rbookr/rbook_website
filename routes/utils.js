/* 
 * 路径: utils/exists/:id
 * 作用: 判断文章是否存在
 * */
const router = require('koa-router')()
router.prefix('/utils')

router.get('/exists/:id', async function (ctx, next) {

  //let Info = await global.bookSystem.find(ctx.params.id)

  let Info = await global.bookSystem.Db.find({$or:[{_id:ctx.params.id},
    {
      "head.extra_id": {
        $in:[ctx.params.id]
      }
    }
  ]})

  if( !Info || Info.length == 0){
    ctx.body = { exists:false }
  }
  else {
    ctx.body = { exists:true }
  }
})

module.exports = router
