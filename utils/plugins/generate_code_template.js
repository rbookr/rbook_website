/* 生成模板的html文件 */

const pathFn = require("path")
const fs = require("fs")
const clonedeep = require('lodash.clonedeep')

/* 递归,得到目录的列表*/
function dfs_get_md_in_catalogs(catalogs,path){
  let mds = []

  function dfs(catalogs,path){
    let now_path = pathFn.join(path,catalogs.path || '')
    if( pathFn.extname(now_path)  === '.md'){

      mds.push({
        path : now_path,
        id : catalogs.url.split('/')[1]
      })

    }
    else if( catalogs.children ){
      for( let children of catalogs.children)
        dfs(children,now_path)
    }

  }

  dfs(catalogs,path)

  return mds

}


module.exports = async (opts)=>{
    /* 递归目录 */

    let template = []
    let list =  dfs_get_md_in_catalogs( global.catalogs[1],bookSystem.localRespository) 
    for( let {id,path} of list){
      let content = await bookSystem.Render.render(path,global.config|| {},true)
      if( content.length > 0 ){
        let Info = await global.bookSystem.find(id)
        template.push(`<h2> ${Info.head.title || Info.title} </h2>\n`)
        template.push(content)
      }
    }

  fs.writeFile(pathFn.join(bookSystem.localRespository,'code_template.html'),template.join('\n'), {encoding:'utf-8'},function(){
    debug('==模板生成完毕==')
  })

}

