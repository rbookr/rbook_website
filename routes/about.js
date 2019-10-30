const router = require('koa-router')()
const pathFn = require("path")
const fs = require("fs")

const about_list=['readme.md','README.md']
router.get('/about',async (ctx ,next)=>{
  for ( let name of about_list){
    let path = pathFn.join( global.config.localRespository,name)
    if( fs.existsSync(path)){
      let article = await Cache.get(`about`)
      if( !article){
        article = await bookSystem.Render.render(path)
        Cache.set(article,config.cache_time)
      }
      let {head} = bookSystem.Scan.split(path)
      await ctx.render('article',{
        title:'关于',
        article,
        head
      })
      return
    }
  }
  await next()
})

module.exports = router
