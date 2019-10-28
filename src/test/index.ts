import BookSystem from "../bookSystem"

var book = new BookSystem({
    remoteRespository:"",
    localRespository:"/home/rainboy/mycode/bookData",
    catalogueEnterPoints:[],
    scanCatalogue:true,
    scanAllRespository:true,
})

//let ans = book.Scan.scanAllRespository()
//let O:SUMMARY = {name:'test'}
//let ans = book.Scan.loadSummary(book.localRespository+'/算法篇', O)
//console.log(JSON.stringify(O,null,4))


async function main(){
    let asn = await book.Scan.scanAllRespository()
    book.Db.findOne_by_id('cc0a9b6d564a9385eda3a23053a7b8b0').then( doc=>{
        console.log("================")
        console.log(doc)
        console.log("================")
    })

}

main()
