import fs = require("fs")
import pathFn from 'path'
import {fileURLToPath} from 'url'
class Scan {
    parent:bookSystem
    constructor(parent:bookSystem){
        this.parent = parent
    }
    scanCatalogues(){
    }
    scanAllRespository(){
        return this.get_all_files_in_dir(this.parent.localRespository, [/^_/], [/\.md$/])
    }

    /** 
     * @method matched_count
     * @param {string} filename 文件或文件夹的名字
     * @description 判断filename满足RegExp列表的个数
     * */
    matched_count(filename:string,fliters:RegExp[]):number{
        let matched:number[] = fliters.map((reg)=>{
            if( reg.test(filename))
                return 1;
            return 0;
        })
        let count = matched.reduce((tot,num)=>{ return tot+num;})
        return count
    }

    /** 
     * @method get_all_files_in_dir
     * @description 获得某个文件夹过滤下的所有文件
     * */
    get_all_files_in_dir(path:string,not_include_fliters:RegExp[],include_fliters:RegExp[]):file_info[]{
        let __files__:file_info[] = []
        let basePath  = path
        let self = this
        function _get(path:string){
            let files = fs.readdirSync(path)

            files.map( (file)=>{
                if( self.matched_count(file, not_include_fliters) > 0)
                    return;

                let filePath = pathFn.join(path,file)
                let fileSta  = fs.statSync(filePath)

                if( fileSta.isDirectory()){ // 文件夹
                    _get(filePath)
                }
                else if( fileSta.isFile()){ // 文件
                    if( self.matched_count(file, include_fliters) == 0)
                        return;
                    __files__.push({
                        path,                                  //当前文件的路径
                        rpath: pathFn.relative(basePath,filePath),  //相当传进来的最基础路径的 相对路径
                        full_path:filePath,                 //完整路径
                        basename:file.split(".")[0],    //文件名,去除后缀的名字
                        extname:pathFn.extname(file) //后缀
                    })
                }
            } )
        }

        _get(path)
        return __files__
    }
}

export default Scan
