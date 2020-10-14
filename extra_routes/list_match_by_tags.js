/* 
 * 通过tags来返回列表
 * list_mach_by_tags/?tags=a,b,c,d
 * tags 必须都要被包含
 *
 * 返回
 * {
 *  status:0,
 *  messgage:ok,
 *  list: [
 *      {
 *          "_id": "3ef076c6cf81bc82ab6ceaa9766ee993",
 *          "real_path": "/home/rainboy/mycode/pcs/uva/455/1.md",
 *          "resolve_path": "uva/455/1.md",
 *          "update_time": 1559581380,
 *          "title": "uva 445 Periodic Strings",
 *          "head": {
 *            "title": "uva 445 Periodic Strings",
 *            "level": 2,
 *            "author": "rainboy",
 *            "create": "2019-06-04 01:03",
 *            "update": "2019-06-04 01:03",
 *            "tags": [
 *              "uva",
 *              "字符串"
 *            ],
 *            "source": [
 *              {
 *                "oj": "uva",
 *                "url": "https://vjudge.net/problem/UVA-455#author=pangda"
 *              }
 *            ]
 *          }
 *        },
 *        ...
 *        ]
 *  }
 * */
module.exports = async function list_mach_by_tags(ctx,next){
  let _tags = ctx.request.query.tags || ""
  let list_query = {}
  let tags = _tags.split(",").filter( tag => tag.length)
  let query = {$and:[]}
  //tags.map( tag => query.head["$and"].push({tags:tag}) )
  tags.map( tag => query["$and"].push({"head.tags":tag}) )
  let articles = await bookSystem.Db.find(query)
  ctx.body = {
    message:'ok',
    //query,
    articles
  }
}
