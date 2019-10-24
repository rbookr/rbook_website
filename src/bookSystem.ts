import Url from "./subClass/urlClass"
import Scan from "./subClass/scanClass"
import Db from './subClass/DataClass'
class BookSystem implements bookSystem{
    remoteRespository:string//远程仓库
    localRespository:string //本地仓库
    catalogueEnterPoints:string[] //yml目录描述入口
    scanCatalogue:Boolean
    scanAllRespository:Boolean //

    Scan:Scan
    Url:Url
    Db:Db

    constructor(opts:bookSystemOpts){

        this.remoteRespository = opts.remoteRespository
        this.localRespository = opts.localRespository
        this.catalogueEnterPoints = opts.catalogueEnterPoints
        this.scanCatalogue = opts.scanCatalogue
        this.scanAllRespository = opts.scanAllRespository

        this.Scan = new Scan(this)
        this.Url = new Url(this)
        this.Db = new Db(this)
    }
}

export default BookSystem
