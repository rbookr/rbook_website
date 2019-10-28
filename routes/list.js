const router = require('koa-router')()
router.prefix('/list')

router.get('/',async (req,next)=>{
  req.body = 'list'
})

module.exports = router
