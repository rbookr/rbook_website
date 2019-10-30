/* 
 * 路径: article/:_id ?
 *
 *
 * */
const router = require('koa-router')()
router.prefix('/article')

router.get('/:id', async function (ctx, next) {
  let Info = await global.bookSystem.find(ctx.params.id)
  //console.log(Info)
  let article = await Cache.get(`article-${Info._id}`)
  let viewcount = await Cache.count(`article-${Info._id}`)
  if( !article){
    article = await global.bookSystem.render(Info.real_path)
    Cache.set(`article-${Info._id}`,article,config.cache_time)
  }
  ctx.body = `article: ${ctx.params.id}`
  await ctx.render('article',{
    title: Info.head.title || Info.title,
    article,
    info:Info,
    viewcount
  })
})

module.exports = router
