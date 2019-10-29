const router = require('koa-router')()
router.prefix('/list')


router.get('/',async (ctx,next)=>{
  let docs = await bookSystem.Db.pagenation({},1,30);
  console.log(docs)
  await ctx.render('list',{
    title:"列表",
    list:docs
  })
})

module.exports = router
