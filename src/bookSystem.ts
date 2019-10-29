import Url from "./subClass/urlClass"
import Scan from "./subClass/scanClass"
import Db from './subClass/DataClass'
import Render from './subClass/renderClass'
import {fileURLToPath} from 'url'
class BookSystem implements bookSystem{
    remoteRespository:string//远程仓库
    localRespository:string //本地仓库
    catalogueEnterPoints:string[] //yml目录描述入口
    scanCatalogue:Boolean
    scanAllRespository:Boolean //

    Scan:Scan
    Url:Url
    Db:Db
    Render:Render

    constructor(opts:bookSystemOpts){

        this.remoteRespository = opts.remoteRespository
        this.localRespository = opts.localRespository
        this.catalogueEnterPoints = opts.catalogueEnterPoints
        this.scanCatalogue = opts.scanCatalogue
        this.scanAllRespository = opts.scanAllRespository

        this.Scan = new Scan(this)
        this.Url = new Url(this)
        this.Db = new Db(this)
        this.Render = new Render(this)
    }

    /** 清空数据库 */
    clear(){
      return new Promise( (res,rej)=>{
        this.Db.db.remove({},{multi:true},(err,numRemove)=>{
          if( err)
            rej(err)
          else
            res(numRemove)
        } )
      })
    }
    
    /** 查找文章 */
    find(_id:string){
        return this.Db.findOne_by_id(_id)
    }

    /** 渲染 */
    render(filePath:string){
        return this.Render.render(filePath)
    }
}

export default BookSystem
