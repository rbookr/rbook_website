import md5 from 'md5'
import pathFn from 'path'
import {Url} from 'url'
class url {
    parent:bookSystem
    constructor(parent:bookSystem){
        this.parent = parent
    }

    url_to_id(url:string){
        return pathFn.basename(url)
    }


    id_2_url(_id:string){
        return `article/${_id}`
    }

    /** 
     * @description 根据给定的路径,返会文章id
     * */
    path_2_id(resolve_path:string){
        //@ts-ignore
        let info = this.parent.Scan.split(resolve_path)
        let _id = info._id || md5(resolve_path)
        return _id
    }

    path_2_url(resolve_path:string){
        return this.id_2_url(this.path_2_id(resolve_path))
    }

    /** 通过nedb查找 */
    id_2_path(url:string){
        //let _id = this.url_to_id(url)
    }
}

export default url
