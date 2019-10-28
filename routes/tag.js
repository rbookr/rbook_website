const router = require('koa-router')()
router.prefix('/tag')

router.get('/',async (req,next)=>{
  req.body = 'tag'
})

module.exports = router
