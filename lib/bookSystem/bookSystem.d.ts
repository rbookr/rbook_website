import Url from "./subClass/urlClass";
import Scan from "./subClass/scanClass";
import Db from './subClass/DataClass';
import Render from './subClass/renderClass';
declare class BookSystem implements bookSystem {
    remoteRespository: string;
    localRespository: string;
    catalogueEnterPoints: string[];
    scanCatalogue: Boolean;
    scanAllRespository: Boolean;
    Scan: Scan;
    Url: Url;
    Db: Db;
    Render: Render;
    constructor(opts: bookSystemOpts);
    /** 清空数据库 */
    clear(): Promise<unknown>;
    /** 查找文章 */
    find(_id: string): Promise<unknown>;
    /** 渲染 */
    render(filePath: string): Promise<any>;
}
export default BookSystem;
