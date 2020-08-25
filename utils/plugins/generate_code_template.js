/* 生成模板的html文件 */

const pathFn = require("path")
const fs = require("fs")
const clonedeep = require('lodash.clonedeep')
const uuid = require('shortid').generate


/* */
/**
 * 递归,转目录成列表
 * @param {Object} catalogs- 目录结构
 * @param {string} path - 目录所在的地址
 * @return [Array]
 *      [
 *          path:
 *          id:
 *          pre:['算法篇','动态规划']
 *      ]
 */
function dfs_get_md_in_catalogs(catalogs,path){
  let mds = []

  function dfs(catalogs,path,pre){
    let now_path = pathFn.join(path,catalogs.path || '')
    if( pathFn.extname(now_path)  === '.md'){

      mds.push({
        path : now_path,                    //文章在路径
        id   : catalogs.url.split('/')[1],  //文章的id
        pre  : pre
      })

    }
    else if( catalogs.children ){
      //console.log(JSON.stringify(catalogs,null,4))
      for( let children of catalogs.children)
        dfs(children,now_path,[...pre,(catalogs.name || catalogs.title)])
    }

  }

  dfs(catalogs,path,[])

  return mds
}


module.exports = async (opts)=>{
    /* 递归目录 */

    let template = []

  /* 根据目录生成的数据是平坦的数组
   * [
   * {
   *    path: '/home/rainboy/mycode/bookData/算法篇/动态规划/线型DP/lis/LIS最长不下降子序列.md',
   *    id: 'd6aeb821d1070e384efd5681b490a2c6',
   *    pre: [ '算法篇', '动态规划', '线型DP', 'LIS最长不下降子序列' ]
   * },
   * ...
   * ]
   * */

  let catalog_page_str=""

  for(let id of opts.ids){
    let list =  dfs_get_md_in_catalogs( global.catalogs[id],bookSystem.localRespository) 

    let catalog_page = []
    let PRE = [] //前一个文章在目录
    let PRE_CNT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    //console.log("--------------------------------")
    //console.log(opts)
    //console.log(global.catalogs[id])
    //console.log("--------------------------------")
    if( list[0] ) PRE.push(list[0].pre[0]) //加入名字 例如: 算法篇
    catalog_page_str += `<h1 class="catalog-title">${global.catalogs[id].name ||global.catalogs[id].title }</h1>`

    function get_head(pre,now){
      flag = true;
      ret_string = []
      for(let i = 0 ;i< pre.length || i < now.length ;i++){
        if( now[i] != pre[i] || !flag){
          if( !now[i]) break;
          flag = false;
          let uid = uuid()
          let level =i+1
          PRE_CNT[level]++;
          PRE_CNT.fill(0,level+1)
          let name = PRE_CNT.slice(2,level+1).join('.') + " " +now[i] //生成在目录中的名字
          ret_string.push(`<h${level} id="${uid}">${name}</h${level}>`)
          catalog_page.push({level,name,uid})
        }
      }
      return ret_string.join('\n')
    }

    for( let {id,path,pre} of list){
      let content = await bookSystem.Render.render(path,global.config|| {},true) //渲染template内容
      if( content.length > 0 ){
        let Info = await global.bookSystem.find(id)
        let title = pre.concat(Info.head.title || Info.title)
        //console.log('================')
        //console.log(PRE)
        //console.log(title)
        //console.log('================')
        template.push(get_head(PRE,title))
        template.push(content)
        //生成目录索引
        PRE = title
      }
    }

    let ___catalog_page_str = catalog_page.map( o => `<li class="level-${o.level}">
  <a href="#${o.uid}">
  <div class="list-nap">${o.name}</div>
  <div class="list-line"></div>
  <div class="list-con">0</div>
</a></li>`)
    catalog_page_str += `<ul class="catalog_list"> ${___catalog_page_str.join('\n')} </ul>`

  }

  template.unshift(catalog_page_str)

  fs.writeFile(pathFn.join(bookSystem.localRespository,'code_template.html'),template.join('\n'), {encoding:'utf-8'},function(){
    debug('==模板生成完毕==')
  })

}

