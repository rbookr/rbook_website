#!/usr/bin/env node

global.debug = require('debug')('*');
var http = require('http');
var fs = require('fs')
var jsyaml = require("js-yaml")
const pathFn = require("path")
var {scanBookGit} = require("../utils/index")
const { execSync ,exec} = require("child_process")

/* 1.====== 加载配置 ====== */
let token = process.argv[3]
if(!token){
  console.error('usage : autoIssue config_path token')
  console.error(`需要token 作为第二个参数`)
  console.error(`创建token的地址为：https://github.com/settings/tokens`)
  console.error(`可以参考：https://www.infoq.cn/article/mAJ75QPWpdCYzptpP6e3`)
  process.exit(0)
}

let config_path = process.argv[2]
if(!config_path){
  console.error('usage : autoIssue config_path token')
  process.exit(0)
}

try{
  global.config = jsyaml.safeLoad( fs.readFileSync(config_path,{encoding:'utf-8'}))
}
catch(e){
  console.error(`配置文件加载错误,${config_path}`)
  console.error(e)
  process.exit(0)
}



//"=========================== github API
function send(cmd){
  return new Promise( (res,rej)=>{
    exec(cmd,{encoding:'utf8'},(err,stdout,stderr)=>{
      if( err ) rej(err)
      else res(stdout)
    })
  })
}

async function check_issue_exists_by_lable(labels,c) {
  let urls = `'https://api.github.com/repos/${c.owner}/${c.repo}/issues?labels=${labels.join(',')}'`
  let a = await send(`curl ${urls}`)
  return JSON.parse(a).length >=1
}
async function create_issue(json,c){
  let issuesUrl = `https://api.github.com/repos/${c.owner}/${c.repo}/issues?access_token=${token}`;
  let res = await send(`curl "${issuesUrl}" -X POST -d '${JSON.stringify(json)}'`)
  return res
}

//create_issue({labels:[config.kind,"testId"],title:"testTile"})
//check_issue_exists_by_lable(['testId'])
//"=========================== END
// 清空插件
config.plugins = []

//config.remoteRespository = config.localRespository = "/home/rainboy/mycode"

/* 2.====== 加载BookSystem ====== */
var BookSystemClass = require("../lib/bookSystem/bookSystem").default
global.bookSystem = new BookSystemClass(global.config)


async function main(){
  console.log("扫描书的内容======")
  await scanBookGit();
  let books = await bookSystem.Db.find({})
  let c = {...config.Gitalk,kind:"Gitalk"}
  for (let info of books){
    if( info._id.length == 32){
      console.log(`=> _id 不是稳定的,请添加文件yaml头`)
      console.log(`======> ${info.resolve_path}`)
      continue
    }
    let labels=[c.kind,info._id]
    let issuesExists = await check_issue_exists_by_lable(labels,c)
    if( issuesExists )
      console.log(info.head.title ,info.resolve_path ,"存在")
    else {
      console.log(info.head.title ,info.resolve_path ,"  不存在")
      await create_issue({labels,title:info.head.title,body:`${config.site_href}article/${info._id}`,},c)
      console.log("[==============>] 创建issue成功：",info.resolve_path)
      //process.exit(0)
    }
  }

}

main()
