const router = require('koa-router')()
router.prefix('/tag')

router.get('/',async (ctx,next)=>{
  let tag_clound = await Cache.get(`tag_clound`)
  if( !tag_clound){
    tag_clound = await bookSystem.Db.get_all_tags()
    Cache.set(`tag_clound`,JSON.stringify(tag_clound),60*2)
  }

  if( typeof tag_clound === 'string')
    tag_clound = JSON.parse(tag_clound)
  await ctx.render('tags',{
    title:"标签云",
    tag_clound
  })
})

module.exports = router
