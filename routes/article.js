/* 
 * 路径: article/:_id ?
 *
 *
 * */
const router = require('koa-router')()
router.prefix('/article')


router.get('/:id', function (ctx, next) {
  req.body = `article: ${req.params.id}`
})

module.exports = router
