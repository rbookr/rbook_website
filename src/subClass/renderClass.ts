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
            //@ts-ignore
            return md.render(this.parent.Scan.splitStr(str).content)
        })
    }
}

export default RenderClass
