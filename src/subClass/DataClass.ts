import nedb from 'nedb'
class Data {
    parent:bookSystem
    db : nedb
    constructor(parent:bookSystem,dataFilename:string){
        this.parent = parent
        this.db = new nedb({filename:dataFilename,autoload:true})
    }

    update(doc:document){
        let self = this
        return new Promise( (res,rej)=>{
            self.db.update({_id:doc._id},doc,{upsert:true},(err,numReplace,upser)=>{
                if( err)
                    rej(err)
                else
                    res()
            })
        })
    }
}
