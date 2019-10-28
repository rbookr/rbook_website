const router = require('koa-router')()
router.prefix('/catalog')


router.get('/',async (req,next)=>{
  req.body = 'catalog'
})

module.exports = router
