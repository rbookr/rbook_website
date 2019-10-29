import ejs from 'ejs'
import pathFn from 'path'
const md = require("../../../markdown-r")
class RenderClass {
    parent:bookSystem
    constructor(parent:bookSystem){
        this.parent = parent
    }

    ejsRender(path:string){
        return new Promise( (res,rej)=>{
            ejs.renderFile(path, {},{},(err,str)=>{
                if(err)
                    rej(err)
                else
                    res(str)
            })
        })
    }

    render(path:string){
        let filePath = path
        if( ! pathFn.isAbsolute(filePath))
            filePath = pathFn.join(this.parent.localRespository,filePath)
        return this.ejsRender(path).then( (str)=>{
            return this.imagePath_translate(
                //@ts-ignore
                md.render(this.parent.Scan.splitStr(str).content), 
                "/"+pathFn.relative(this.parent.localRespository,pathFn.dirname(filePath))
            )
        })
    }

    /* 转换imagepath */
    imagePath_translate(html:string,path:string){
        let cur_path = path || '/'

        if(cur_path.charAt(cur_path.length-1) !== '/') //最后一个字符
            cur_path += '/'

        let image_reg = /<img src="([\S\s]+?)"/g

        return html.replace(image_reg,function($1,$2){
            let rep_str = ""

            if($2.substring(0,2)=='./'){
                rep_str = cur_path + $2.slice(2)
            }
            else if($2.substring(0,3)=='/./')
                $2 = $2.slice(1)
            else if($2.substring(0,7) == "http://" || $2.substring(0,8) == "https://")
                rep_str =$2
            else if($2.charAt(0) === '/'){
                rep_str =$2
            }
            else
                rep_str = cur_path + $2

            return `<img src="${rep_str}"`
        })
    }
}

export default RenderClass
