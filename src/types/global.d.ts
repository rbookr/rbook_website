
interface bookSystemOpts {
    remoteRespository:string//远程仓库
    localRespository:string //本地仓库
    catalogueEnterPoints:string[] //yml目录描述入口
    scanCatalogue:Boolean
    scanAllRespository:Boolean //
}

interface bookSystem  extends bookSystemOpts {
}
