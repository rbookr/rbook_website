const router = require('koa-router')()
const {generator_pagenaion_info} = require("../utils/index")
router.prefix('/list')


router.get('/',async (ctx,next)=>{
  let query = ctx.request.query
  let page = parseInt(query.page || '1')
  let pageSize = config.pagenationSize || 30

  let article_count = await bookSystem.Db.count({})
  let totalPage = Math.ceil( article_count / pageSize)
  let docs = await bookSystem.Db.pagenation({},page,pageSize);
  /*  first,last { url: active,}
   *
   * */
  await ctx.render('list',{
    title:"列表",
    list:docs,
    pagination:generator_pagenaion_info(ctx.path,query,page,totalPage)
  })
})

module.exports = router
