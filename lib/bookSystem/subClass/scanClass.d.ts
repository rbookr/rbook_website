declare class Scan {
    parent: bookSystem;
    rFrontMatter: RegExp;
    constructor(parent: bookSystem);
    splitStr(str: string, filePath: string): {
        head: any;
        content: string;
    };
    /** 得到模板内容 */
    splitTemplate(str: string, filePath: string): string;
    split(filePath: string): article_split_info;
    gen_document(filePath: string): any;
    /** 目录扫描 */
    scanCatalogues(catalogPath: string): Promise<SUMMARY[] | undefined>;
    is_yaml_file(_path: string): boolean;
    /** 读取目录 */
    loadSummary(path: string, parent: SUMMARY): Promise<null | undefined>;
    /**
     * @description 扫描所有内容并存入nedb
     * */
    scanAllRespository(): Promise<void>;
    /**
     * @method matched_count
     * @param {string} filename 文件或文件夹的名字
     * @description 判断filename满足RegExp列表的个数
     * */
    matched_count(filename: string, fliters: RegExp[]): number;
    /**
     * @method get_all_files_in_dir
     * @description 获得某个文件夹过滤下的所有文件
     * */
    get_all_files_in_dir(path: string, not_include_fliters: RegExp[], include_fliters: RegExp[]): file_info[];
}
export default Scan;
