const qs= require("querystring")
exports.generator_pagenaion_info = function(base,list_query,current,totalPage){
  let size = 3
  let right_limit = Math.min(current+3,totalPage)
  let left_limit = Math.max(current-3,1)

  let query = {}
  for( let key in list_query) {
    if( /^head\..*/.test(key)){
      let _key = key.split(".")[1]
      query[_key] = list_query[key]
    }
  }

  let left_go = 0;
  let right_go = 0;
  if( right_limit >= totalPage){
    left_go = size-(right_limit-current);
    left_limit = Math.max(1,current-left_go-size)
  }

  if( left_limit <= 1){
    right_go = size-(current-left_limit);
    right_limit = Math.min(totalPage,current+size+right_go);
  }
  let url = []
  for(let i = left_limit;i<=right_limit;i++)
    url.push({
      url:`${base}?${qs.stringify(Object.assign(query, {page:i}))}`,
      page:i
    })
  return {
    totalPage,
    current,
    pre:`${base}?${qs.stringify(Object.assign(query, {page:current-1}))}`,
    next:`${base}?${qs.stringify(Object.assign(query, {page:current+1}))}`,
    url
  }
}
