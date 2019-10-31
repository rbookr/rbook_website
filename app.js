const Koa = require('koa')
const fs = require("fs")
const pathFn = require("path")
const send = require("koa-send")
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const favicon = require('koa-favicon');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redis_class = require("./lib/redis")

global.Cache = new redis_class(config.redis)


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(favicon( global.config.favicon || __dirname + '/static/images/favicon.ico'));

app.use(require('koa-static')(__dirname + '/static'))
app.use(require('koa-static')(__dirname + '/markdown-r/assets'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// middlewares

app.use( async (ctx,next)=>{
    let ext = pathFn.extname(ctx.path)
    if( ['.png','.jpg','.gif'].indexOf(ext) !== -1){
        //let real_path = pathFn.join(C.book_path,ctx.path)
        await send(ctx,ctx.path,{ root: config.localRespository })
        return
    }
    else
        await next()
})

app.use(async (ctx,next)=>{
  ctx.state = {
    config:global.config
  }
  await next()
})
// index alias
app.use(async (ctx,next)=>{
  if( ctx.path === '/' && config.index_alias){
    ctx.path= config.index_alias
  }
  await next()
})

// routes load
var routers = fs.readdirSync(__dirname+"/routes")
for( let route_name of routers){
  let basename = pathFn.basename(route_name,'.js')
  let route = require(__dirname+"/routes/"+route_name)
  if (config.route_disable && config.route_disable.indexOf(basename) != -1)
    continue;
  app.use(route.routes(),route.allowedMethods());
  debug(`加载 route: ${basename}`)
}


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
