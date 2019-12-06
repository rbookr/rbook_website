/* 
 * 路径: article/:_id ?
 *
 *
 * */
const router = require('koa-router')()
var viewcount = 1
router.get('/', async function (ctx, next) {
  
  await ctx.render('single',{
    title: markdown.Info.head.title || 'single',
    article:markdown.html,
    info:markdown.Info,
    viewcount:viewcount++
  })
})

module.exports = router
