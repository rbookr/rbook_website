const router = require('koa-router')()
router.prefix('/catalog')

router.get('/',async (ctx,next)=>{
  await ctx.render('catalog',{
    title:'目录',
    catalogs:global.catalogs
  })
})

module.exports = router
