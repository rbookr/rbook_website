
interface file_info{
    path:string
    rpath:string
    full_path:string
    basename:string
    extname:string
}

interface article_split_info {
    head:{
        _id?:string
        date?:Date      //创建时间
        update?:Date    //更新时间
        author?:string  //作者
        password?:string // 密码
        tag?: string[]   // tag
        [key:string]:any
    }
    content:string
}

interface SUMMARY {
    url?:string
    name:string
    children?:SUMMARY[]
}
