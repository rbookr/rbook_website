import fs = require("fs")
import pathFn from 'path'
import {fileURLToPath} from 'url'
import jsyaml  from 'js-yaml'
import emojiToolkit = require("emoji-toolkit")
import md5 from "md5"
import moment from 'moment'

class Scan {
    parent:bookSystem
    rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
    /* 分割文件 YAML信息头 和 真实内容*/
    constructor(parent:bookSystem){
        this.parent = parent
    }

    splitStr(str:string,filePath:string){
        if (this.rFrontMatter.test(str)) {
            let match = str.match(this.rFrontMatter);
            try {
                return {
                    head: jsyaml.safeLoad( match![2]),
                    content: match![3] || '',
                };
            }
            catch (e){
                console.error(`yaml load head Error : ${filePath}`)
                process.exit(0)
            }
        }
        return {head:{},content: str};
    }

    split(filePath:string):article_split_info{
        if( !pathFn.isAbsolute(filePath))
            filePath = pathFn.join(this.parent.localRespository,filePath)
        let str = fs.readFileSync(filePath,{encoding:'utf-8'})
        return this.splitStr(str, filePath)
    }

    gen_document(filePath:string):document{
        //let doc:document = {_id:""}
        let fileInfo = this.split(filePath)

        let resolve_path = filePath
        let real_path = filePath
        if( pathFn.isAbsolute(filePath))
            resolve_path = pathFn.relative(this.parent.localRespository, real_path)
        else
            real_path = pathFn.join(this.parent.localRespository,resolve_path)

        let doc:document = {
            _id: fileInfo.head._id || md5(resolve_path),
            real_path,
            resolve_path,
            update_time:fileInfo.head.update? moment(fileInfo.head.update).unix()  : 0,
            title: fileInfo.head.title  ? fileInfo.head.title : pathFn.basename(resolve_path,'.md'),
            head:fileInfo.head
        }
        return doc
    }

    /** 目录扫描 */
    scanCatalogues(catalogPath:string){
        let catalog:SUMMARY = {name:''}
        let path = catalogPath
        if( !pathFn.isAbsolute(path))
            path = pathFn.join(this.parent.localRespository,path)
        this.loadSummary(path, <SUMMARY>catalog)
        return catalog.children
    }

    is_yaml_file(_path:string){
        return pathFn.extname(_path) === '.yml'
    }

    /** 读取目录 */
    async loadSummary(path:string,parent:SUMMARY){
        let basePath = path
        let summaryPath = path
        //@ts-ignore
        let Url = this.parent.Url
        if( !this.is_yaml_file(path) ){
            //basePath = pathFn.dirname(path)
            summaryPath= pathFn.join(path,'SUMMARY.yml')
        }
        else {
            basePath = pathFn.dirname(path)
        }
        if( !fs.existsSync(path)) //不存在
            return null

        parent.children = []

        let summary_array = jsyaml.safeLoad(fs.readFileSync(summaryPath,{encoding:'utf-8'}));

        //遍历
        if( !summary_array ) return

        for(let item of summary_array){
            let {path:subpath,title,name} = item
            let real_path
            try {
                real_path = pathFn.join(basePath,subpath)
            }
            catch(e){
                console.error(basePath)
                throw(e)
            }

            let stat = fs.statSync(real_path)

            if(stat.isFile()) //是文件
            {

                let doc = this.gen_document(real_path)
                parent.children.push(
                    Object.assign(item, 
                        {
                            name:emojiToolkit.shortnameToImage( title || name ||'unkown' ),
                            url: Url.id_2_url(doc._id)
                        }
                    )
                )
                //console.log(doc)
                //@ts-ignore
                await this.parent.Db.update(doc)

            }
            else if( stat.isDirectory()){ //是目录
                var new_data:SUMMARY = Object.assign(item, 
                    {
                        name: emojiToolkit.shortnameToImage( title || name ||'unkown')
                    }
                )

                this.loadSummary(real_path,new_data)

                if( new_data.children &&  new_data.children.length !== 0 )
                    parent.children.push(new_data)
            }
        }
    }

    /** 
     * @description 扫描所有内容并存入nedb
     * */
    async scanAllRespository(){
        let files = this.get_all_files_in_dir(this.parent.localRespository, [/^_/,/_draft/,/^readme.md$/i], [/\.md$/])
        files.map( async ({path,rpath,full_path})=>{
            /** 存储 进 数据库 */
            let doc = this.gen_document(full_path)
            //console.log(doc)
            //@ts-ignore
            await this.parent.Db.update(doc)

        })
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
