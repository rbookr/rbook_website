class codeMap {
  constructor(){
    /* 
     * {
     *   "_id_1":{_id_2:{isReal:true} }
     *   "_id_2":{_id_1:{isReal:false}}
     * }
     * isReal这条边是否真实存在
     * */
    this.data = {}
  }

  addEdge( arr_u,arr_v,ToF){
    if(!(arr_u instanceof Array)) arr_u = [arr_u]
    if(!(arr_v instanceof Array)) arr_v = [ arr_v ]
    for( let u of arr_u)
      for( let v of arr_v){
        if(!this.data[u]) this.data[u] = {}
        if(this.data[u][v])
          this.data[u][v].isReal = this.data[u][v].isReal || ToF
        else
          this.data[u][v] = { isReal:ToF }
      }
  }

  async get_One_relate_article_map(_id){
    if( !this.data[_id]) return null
    let edges = []
    let q = [_id] //队列
    let set = new Set()

    while( q.length !=0 ){
      let h = q.pop(); 
      if( !this.data[h] ) continue;
      for( let key in this.data[h]){
        let uid_e = `${h}-${key}`

        if(!set.has(uid_e)) {
          set.add(uid_e)
          q.push(key)
          if( this.data[h][key].isReal ) edges.push([h,key])
        }
      }
    }
    //console.log(edges)
    return await this.dot(edges,_id)
    //console.log(a)
  }

  get_all_article(){
  }

  async dot(edges,sp_node){ //得到dot数据
    let head = `digraph g {
    rankdir=LR;
    node[shape=Mrecord style=filled fillcolor=white colorscheme=brbg3 margin="0.05" width=0 height=0];
    edge [style="solid",color="black",arrowhead="vee" arrowsize=.9];`

    let end = '}'
    let nodes = {}
    for( let [u,v] of edges){
      if( !nodes[u]) nodes[u] = await bookSystem.Db.findOne_by_id(u)
      if( !nodes[v]) nodes[v] = await bookSystem.Db.findOne_by_id(v)
    }

    let lines = edges.map(([u,v])=>{
      return `"${u}"->"${v}";`
    })
    for( let key in nodes){
      lines.push(`"${key}"[label="${nodes[key].title}" URL="/article/${key}"];`)
    }
    if( sp_node ) lines.push(`"${sp_node}"[fillcolor=3];`)
    lines.unshift(head)
    lines.push(end)
    return lines.join('\n')
  }

  //扫描数据形成,图数据
  async scan(){
    let docs = await bookSystem.Db.find({$or:[ {"head.pre_article":{$exists:true}},{"head.next_article":{$exists:true}} ]})
    this.data = {}
    if(docs.length == 0) return
    for( let doc of docs){ //生成图的数据
      if( doc.head.pre_article){
        this.addEdge(doc._id,doc.head.pre_article,false)
        this.addEdge(doc.head.pre_article,doc._id,true)
      }
      if( doc.head.next_article){
        this.addEdge(doc._id,doc.head.next_article,true)
        this.addEdge(doc.head.next_article,doc._id,false)
      }
    }
  }
}

global.codemap = new codeMap()


module.exports = async (options) => {
  console.log("====== 加载 codeMap 插件 ======")
  await codemap.scan()
  //codemap.get_One_relate_article_map("acwing-106")
  //codemap.get_One_relate_article_map("acwing-107")
}
