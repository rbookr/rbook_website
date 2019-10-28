const router = require('koa-router')()

router.get('/about',async (req,next)=>{
  req.body = 'about'
})

module.exports = router
