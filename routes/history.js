const router = require('koa-router')()
router.prefix('/history')

router.get('/',async (req,next)=>{
  req.body = 'history'
})

module.exports = router
