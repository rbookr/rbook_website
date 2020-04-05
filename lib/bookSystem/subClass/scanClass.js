"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const emojiToolkit = require("emoji-toolkit");
const md5_1 = __importDefault(require("md5"));
const moment_1 = __importDefault(require("moment"));
class Scan {
    /* 分割文件 YAML信息头 和 真实内容*/
    constructor(parent) {
        this.rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
        this.parent = parent;
    }
    splitStr(str, filePath) {
        if (this.rFrontMatter.test(str)) {
            let match = str.match(this.rFrontMatter);
            try {
                return {
                    head: js_yaml_1.default.safeLoad(match[2]),
                    content: match[3] || '',
                };
            }
            catch (e) {
                console.error(`yaml load head Error : ${filePath}`);
                process.exit(0);
            }
        }
        return { head: {}, content: str };
    }
    /** 得到模板内容 */
    splitTemplate(str, filePath) {
        let content = this.splitStr(str, filePath);
        let ret = [];
        let reg = /<!-- template start -->\n((.|\n)+?)<!-- template end -->/g;
        str.replace(reg, function ($0, $1) {
            ret.push($1);
            return '';
        });
        return ret.join('\n');
    }
    split(filePath) {
        if (!path_1.default.isAbsolute(filePath))
            filePath = path_1.default.join(this.parent.localRespository, filePath);
        let str = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return this.splitStr(str, filePath);
    }
    gen_document(filePath) {
        //let doc:document = {_id:""}
        let fileInfo = this.split(filePath);
        let resolve_path = filePath;
        let real_path = filePath;
        if (path_1.default.isAbsolute(filePath))
            resolve_path = path_1.default.relative(this.parent.localRespository, real_path);
        else
            real_path = path_1.default.join(this.parent.localRespository, resolve_path);
        try {
            let doc = {
                _id: fileInfo.head._id || md5_1.default(resolve_path),
                real_path,
                resolve_path,
                update_time: fileInfo.head.update ? moment_1.default(fileInfo.head.update).unix() : 0,
                title: fileInfo.head.title ? fileInfo.head.title : path_1.default.basename(resolve_path, '.md'),
                head: fileInfo.head
            };
            return doc;
        }
        catch (e) {
            console.log(filePath);
        }
    }
    /** 目录扫描 */
    async scanCatalogues(catalogPath) {
        let catalog = { name: '' };
        let path = catalogPath;
        if (!path_1.default.isAbsolute(path))
            path = path_1.default.join(this.parent.localRespository, path);
        await this.loadSummary(path, catalog);
        return catalog.children;
    }
    is_yaml_file(_path) {
        return path_1.default.extname(_path) === '.yml';
    }
    /** 读取目录 */
    async loadSummary(path, parent) {
        let basePath = path;
        let summaryPath = path;
        //@ts-ignore
        let Url = this.parent.Url;
        if (!this.is_yaml_file(path)) {
            //basePath = pathFn.dirname(path)
            summaryPath = path_1.default.join(path, 'SUMMARY.yml');
        }
        else {
            basePath = path_1.default.dirname(path);
        }
        if (!fs.existsSync(path)) //不存在
            return null;
        parent.children = [];
        let summary_array = js_yaml_1.default.safeLoad(fs.readFileSync(summaryPath, { encoding: 'utf-8' }));
        //遍历
        if (!summary_array)
            return;
        for (let item of summary_array) {
            let { path: subpath, title, name } = item;
            let real_path;
            try {
                real_path = path_1.default.join(basePath, subpath);
            }
            catch (e) {
                console.error(basePath);
                throw (e);
            }
            let stat = fs.statSync(real_path);
            if (stat.isFile()) //是文件
             {
                let doc = this.gen_document(real_path);
                parent.children.push(Object.assign({}, item, {
                    name: emojiToolkit.shortnameToImage(title || name || 'unkown'),
                    url: Url.id_2_url(doc._id)
                }));
                //console.log(doc)
                //@ts-ignore
                await this.parent.Db.update(doc);
            }
            else if (stat.isDirectory()) { //是目录
                var new_data = Object.assign({}, item, {
                    name: emojiToolkit.shortnameToImage(title || name || 'unkown')
                });
                await this.loadSummary(real_path, new_data);
                if (new_data.children && new_data.children.length !== 0)
                    parent.children.push(new_data);
            }
        }
    }
    /**
     * @description 扫描所有内容并存入nedb
     * */
    async scanAllRespository() {
        let files = this.get_all_files_in_dir(this.parent.localRespository, [/^_/, /_draft/, /^readme.md$/i], [/\.md$/]);
        files.map(async ({ path, rpath, full_path }) => {
            /** 存储 进 数据库 */
            let doc = this.gen_document(full_path);
            //console.log(doc)
            //@ts-ignore
            await this.parent.Db.update(doc);
        });
    }
    /**
     * @method matched_count
     * @param {string} filename 文件或文件夹的名字
     * @description 判断filename满足RegExp列表的个数
     * */
    matched_count(filename, fliters) {
        let matched = fliters.map((reg) => {
            if (reg.test(filename))
                return 1;
            return 0;
        });
        let count = matched.reduce((tot, num) => { return tot + num; });
        return count;
    }
    /**
     * @method get_all_files_in_dir
     * @description 获得某个文件夹过滤下的所有文件
     * */
    get_all_files_in_dir(path, not_include_fliters, include_fliters) {
        let __files__ = [];
        let basePath = path;
        let self = this;
        function _get(path) {
            let files = fs.readdirSync(path);
            files.map((file) => {
                if (self.matched_count(file, not_include_fliters) > 0)
                    return;
                let filePath = path_1.default.join(path, file);
                let fileSta = fs.statSync(filePath);
                if (fileSta.isDirectory()) { // 文件夹
                    _get(filePath);
                }
                else if (fileSta.isFile()) { // 文件
                    if (self.matched_count(file, include_fliters) == 0)
                        return;
                    __files__.push({
                        path,
                        rpath: path_1.default.relative(basePath, filePath),
                        full_path: filePath,
                        basename: file.split(".")[0],
                        extname: path_1.default.extname(file) //后缀
                    });
                }
            });
        }
        _get(path);
        return __files__;
    }
}
exports.default = Scan;
