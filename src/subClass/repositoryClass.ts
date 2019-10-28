/** 对git 进行pull,push,log */
import { exec } from 'child_process'

/** 执行 */
function execAsync(cmd:string,cwd:string){
    return new Promise( (res,rej)=>{
        exec(cmd, { cwd },(err,stdout,stderr)=>{
            if(err) rej(err)
            res(stdout)
        })
    }).catch( e=>{
        console.error("====== git 发生错误")
        console.error(e)
        throw(e)
    })
}
class repository {
  parent:bookSystem
  constructor(parent:bookSystem){
    this.parent = parent
  }

  async pull_master(){
    let out = execAsync(`git pull origin master`, this.parent.localRespository)
    return out
  }

  async clone(){
    let cmd = `git clone ${this.parent.remoteRespository} ${this.parent.localRespository}`
    await execAsync(cmd, '/')
  }

  async git_init(){

    let init_cmds =['git config --global core.pager cat']
    for( let cmd of init_cmds){
        await execAsync(cmd,this.parent.localRespository)
    }

  }

  async last_commits(n:number=10){
    let out = await execAsync(`git log --no-merges --pretty="[%an]==== %s ===[%cr]" -n ${n}`,this.parent.localRespository)
    return out
  }

}
