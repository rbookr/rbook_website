import nedb from 'nedb'
class Data {
    parent:bookSystem
    db : nedb
    constructor(parent:bookSystem){
        this.parent = parent
        this.db = new nedb()
    }

    /** 
     * @description 更新,不存在就加入
     * */
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

    findOne_by_id(_id:string){
        return new Promise( (res,rej)=>{
            this.db.findOne({_id}, (err,doc)=>{
                if( err)
                    rej(err)
                else
                    res(doc)
            })
        })
    }
}

export default Data
