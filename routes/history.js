const fs = require("fs")
const pathFn = require("path")
const {execSync} = require("child_process")

const regexp = /\[\[\[([\s\S]*?)\]\]\]/g


const router = require('koa-router')()
router.prefix('/history')

router.get('/',async (ctx,next)=>{
  let history = await Cache.get('history')
  let change_files = await Cache.get('change_files')
  if( history ==null || change_files == null) {

      var stdout  = execSync(`git --no-pager log --name-only -n 20 --format="[[[%cr|%B"]]]`,{
        cwd:config.localRespository ,
        encoding:'utf-8'
      });

      history = []
      stdout.replace(regexp, function(a,b){
        history.push(
          b.split("|")
        )
      })

      change_files = []
      for(let i = 0;i<20;i++){
        change_files.push(
          execSync(`git --no-pager log --format="% " --name-status -n 1 --skip=${i}`,{
            cwd:config.localRespository ,
            encoding:'utf-8'
          }).trim()
        )
      }

    await Cache.set('history',JSON.stringify(history),config.cache_time)
    await Cache.set('change_files',JSON.stringify(change_files),config.cache_time)
  }
  else if( change_files !=null && history != null){
    change_files = JSON.parse(change_files)
    history = JSON.parse(history)
  }

  await ctx.render('history',{
    post:{
      head:{
        title:'历史记录[近20条]'
      }
    },
    history,
    change_files
  });
})

module.exports = router
