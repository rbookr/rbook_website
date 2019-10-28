import Url from "./subClass/urlClass";
import Scan from "./subClass/scanClass";
import Db from './subClass/DataClass';
declare class BookSystem implements bookSystem {
    remoteRespository: string;
    localRespository: string;
    catalogueEnterPoints: string[];
    scanCatalogue: Boolean;
    scanAllRespository: Boolean;
    Scan: Scan;
    Url: Url;
    Db: Db;
    constructor(opts: bookSystemOpts);
    /** 清空数据库 */
    clear(): Promise<unknown>;
}
export default BookSystem;
