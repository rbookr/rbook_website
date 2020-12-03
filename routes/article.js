/* 
 * 路径: article/:_id ?
 *
 *
 * */
const router = require('koa-router')()
//const ejs = require('ejs')
const {ejsRenderHeadSourceUrl} = require("../utils")
router.prefix('/article')

router.get('/:id', async function (ctx, next) {
  let Info = await global.bookSystem.find(ctx.params.id)
  if( !Info){
    await next()
    return
  }


  /* 有密码 */
  if(Info.head && Info.head.password && Info.head.password !== ''){
    let password_in_query = ctx.query.password
    if( !password_in_query || password_in_query !== Info.head.password){
      await ctx.render('password',{title:'需要密码'})
      return
    }
  }

  let article = await Cache.get(`article-${Info._id}`)
  let viewcount = await Cache.count(`article-${Info._id}`)
  if( !article){
    article = await global.bookSystem.render(Info.real_path,ctx.state )
    Cache.set(`article-${Info._id}`,article,config.cache_time)
  }
  let code_map = null
  if(global.config.show_article_code_map){
    //console.log("code_map ===")
    code_map = await codemap.get_One_relate_article_map(Info._id)
  }

  //对Info 进行ejs渲染
  ejsRenderHeadSourceUrl(Info.head,ctx.state)

  await ctx.render('article',{
    title: Info.head.title || Info.title,
    article,
    info:Info,
    viewcount,
    code_map
  })
})

module.exports = router
