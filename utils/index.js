const qs= require("querystring")
const fs = require("fs")
const ejs = require('ejs')

exports.generator_pagenaion_info = function(base,list_query,current,totalPage){
  let size = 3
  let right_limit = Math.min(current+3,totalPage)
  let left_limit = Math.max(current-3,1)

  let query = {}
  for( let key in list_query) {
    if( /^head\..*/.test(key)){
      let _key = key.split(".")[1]
      query[_key] = list_query[key]
    }
  }

  let left_go = 0;
  let right_go = 0;
  if( right_limit >= totalPage){
    left_go = size-(right_limit-current);
    left_limit = Math.max(1,current-left_go-size)
  }

  if( left_limit <= 1){
    right_go = size-(current-left_limit);
    right_limit = Math.min(totalPage,current+size+right_go);
  }
  let url = []
  for(let i = left_limit;i<=right_limit;i++)
    url.push({
      url:`${base}?${qs.stringify(Object.assign(query, {page:i}))}`,
      page:i
    })
  return {
    totalPage,
    current,
    pre:`${base}?${qs.stringify(Object.assign(query, {page:current-1}))}`,
    next:`${base}?${qs.stringify(Object.assign(query, {page:current+1}))}`,
    url
  }
}

/* 扫描所有数据 */
exports.scanBookGit = async function (){
  await bookSystem.clear()      //清空数据库
  /* 仓库下载 */
  if( !fs.existsSync(config.localRespository)){
    debug(`======== clone 仓库 =======`)
    await bookSystem.Repository.clone()
  }
  await bookSystem.Repository.git_init()

  //扫描
  if(config.scanAllRespository ){
    await bookSystem.Scan.scanAllRespository()
    debug(`======== 扫描所有数据 结束=======`)
  }
  //扫描 目录
  if( config.scanCatalogue){
    let catalogs = await bookSystem.Scan.scanCatalogues(config.catalogueEnterPoints)
    global.catalogs = catalogs
    debug(`======== 扫描所有目录 结束=======`)
  }

  if( global.config.plugins){
    await plugin(global.config.plugins)
  }
}

/**
 *@method plugin
 *@param {Array} plugins 指明调用哪些plugin 和 给定相应的参数
 *   plugins:[
 *      {
 *          name:'foo_plugin',
 *          opts:{}
 *      }
 *   ]
 *@return {返回值类型} 返回值说明
 *@desc 根据参数运行 plugin目录下的插件
 */
const plugin = async function(plugins){
  debug(`======== 加载 plugins: `)
  for( let p of plugins){
    debug(`  ==> ${p.name}`)
    await require('./plugins/'+p.name)(p.opts)
  }
}


//对文章head里的source.url 进行ejs渲染
exports.ejsRenderHeadSourceUrl = function (head,renderObjs={}){
  if(head && head.source && head.source instanceof Array) {
      for( let i = 0;i< head.source.length;i++){
          head.source[i] = {
            ...head.source[i],
            url: ejs.render(head.source[i].url,renderObjs)
          }
      }
  }
}
