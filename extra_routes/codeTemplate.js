const pathFn = require("path")
const fs = require("fs")
const moment = require("moment")

function get_file_time(path){
  return new Promise((res,rej)=>{
    fs.stat(path, (err,stats)=>{
      if( err ) rej(err)
      res(stats.ctime)
    })
  } )
}


function readAsync (path){
  return new Promise((res,rej)=>{
    fs.readFile(path, {encoding:'utf-8'}, (err,str)=>{
      if( err ) rej(err)
      res(str)
    })
  })
}

module.exports = async (ctx,next,opts)=>{
  if(fs.existsSync(pathFn.join(bookSystem.localRespository,'code_template.html'))){
    let _file_path = pathFn.join(bookSystem.localRespository,'code_template.html')
    //let article = fs.readFileSync(_file_path,{encoding:'utf-8'})
    let article = await readAsync(_file_path)
    let time = await get_file_time(_file_path)

    await ctx.render('template',{
      title: '模板',
      article,
      info:{ head:{}},
      viewcount:0,
      time: moment(time).format('YYYY-MM-DD')
    })

  }
  else {
    ctx.status= 404
    await next()
  }
}
