import Scan from "./subClass/scanClass"
class BookSystem implements bookSystem{
    remoteRespository:string//远程仓库
    localRespository:string //本地仓库
    catalogueEnterPoints:string[] //yml目录描述入口
    scanCatalogue:Boolean
    scanAllRespository:Boolean //

    Scan:Scan

    constructor(opts:bookSystemOpts){

        this.remoteRespository = opts.remoteRespository
        this.localRespository = opts.localRespository
        this.catalogueEnterPoints = opts.catalogueEnterPoints
        this.scanCatalogue = opts.scanCatalogue
        this.scanAllRespository = opts.scanAllRespository

        this.Scan = new Scan(this)
    }
}

export default BookSystem
