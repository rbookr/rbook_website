"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = __importDefault(require("path"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var emojiToolkit = require("emoji-toolkit");
var md5_1 = __importDefault(require("md5"));
var moment_1 = __importDefault(require("moment"));
var Scan = /** @class */ (function () {
    /* 分割文件 YAML信息头 和 真实内容*/
    function Scan(parent) {
        this.rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
        this.parent = parent;
    }
    Scan.prototype.splitStr = function (str, filePath) {
        if (this.rFrontMatter.test(str)) {
            var match = str.match(this.rFrontMatter);
            try {
                return {
                    head: js_yaml_1.default.safeLoad(match[2]),
                    content: match[3] || '',
                };
            }
            catch (e) {
                console.error("yaml load head Error : " + filePath);
                process.exit(0);
            }
        }
        return { head: {}, content: str };
    };
    Scan.prototype.split = function (filePath) {
        if (!path_1.default.isAbsolute(filePath))
            filePath = path_1.default.join(this.parent.localRespository, filePath);
        var str = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return this.splitStr(str, filePath);
    };
    Scan.prototype.gen_document = function (filePath) {
        //let doc:document = {_id:""}
        var fileInfo = this.split(filePath);
        var resolve_path = filePath;
        var real_path = filePath;
        if (path_1.default.isAbsolute(filePath))
            resolve_path = path_1.default.relative(this.parent.localRespository, real_path);
        else
            real_path = path_1.default.join(this.parent.localRespository, resolve_path);
        var doc = {
            _id: fileInfo.head._id || md5_1.default(resolve_path),
            real_path: real_path,
            resolve_path: resolve_path,
            update_time: fileInfo.head.update ? moment_1.default(fileInfo.head.update).unix() : 0,
            title: fileInfo.head.title ? fileInfo.head.title : path_1.default.basename(resolve_path, '.md'),
            head: fileInfo.head
        };
        return doc;
    };
    /** 目录扫描 */
    Scan.prototype.scanCatalogues = function (catalogPath) {
        var catalog = { name: '' };
        var path = catalogPath;
        if (!path_1.default.isAbsolute(path))
            path = path_1.default.join(this.parent.localRespository, path);
        this.loadSummary(path, catalog);
        return catalog.children;
    };
    Scan.prototype.is_yaml_file = function (_path) {
        return path_1.default.extname(_path) === '.yml';
    };
    /** 读取目录 */
    Scan.prototype.loadSummary = function (path, parent) {
        return __awaiter(this, void 0, void 0, function () {
            var basePath, summaryPath, Url, summary_array, _i, summary_array_1, item, subpath, title, name_1, real_path, stat, doc, new_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        basePath = path;
                        summaryPath = path;
                        Url = this.parent.Url;
                        if (!this.is_yaml_file(path)) {
                            //basePath = pathFn.dirname(path)
                            summaryPath = path_1.default.join(path, 'SUMMARY.yml');
                        }
                        else {
                            basePath = path_1.default.dirname(path);
                        }
                        if (!fs.existsSync(path)) //不存在
                            return [2 /*return*/, null];
                        parent.children = [];
                        summary_array = js_yaml_1.default.safeLoad(fs.readFileSync(summaryPath, { encoding: 'utf-8' }));
                        //遍历
                        if (!summary_array)
                            return [2 /*return*/];
                        _i = 0, summary_array_1 = summary_array;
                        _a.label = 1;
                    case 1:
                        if (!(_i < summary_array_1.length)) return [3 /*break*/, 5];
                        item = summary_array_1[_i];
                        subpath = item.path, title = item.title, name_1 = item.name;
                        real_path = void 0;
                        try {
                            real_path = path_1.default.join(basePath, subpath);
                        }
                        catch (e) {
                            console.error(basePath);
                            throw (e);
                        }
                        stat = fs.statSync(real_path);
                        if (!stat.isFile()) return [3 /*break*/, 3];
                        parent.children.push(Object.assign(item, {
                            name: emojiToolkit.shortnameToImage(title || name_1 || 'unkown'),
                            url: Url.path_2_url(path_1.default.relative(this.parent.localRespository, real_path))
                        }));
                        doc = this.gen_document(real_path);
                        //console.log(doc)
                        //@ts-ignore
                        return [4 /*yield*/, this.parent.Db.update(doc)];
                    case 2:
                        //console.log(doc)
                        //@ts-ignore
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (stat.isDirectory()) { //是目录
                            new_data = Object.assign(item, {
                                name: emojiToolkit.shortnameToImage(title || name_1 || 'unkown')
                            });
                            this.loadSummary(real_path, new_data);
                            if (new_data.children && new_data.children.length !== 0)
                                parent.children.push(new_data);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 扫描所有内容并存入nedb
     * */
    Scan.prototype.scanAllRespository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_a) {
                files = this.get_all_files_in_dir(this.parent.localRespository, [/^_/, /_draft/], [/\.md$/]);
                files.map(function (_a) {
                    var path = _a.path, rpath = _a.rpath, full_path = _a.full_path;
                    return __awaiter(_this, void 0, void 0, function () {
                        var doc;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    doc = this.gen_document(full_path);
                                    //console.log(doc)
                                    //@ts-ignore
                                    return [4 /*yield*/, this.parent.Db.update(doc)];
                                case 1:
                                    //console.log(doc)
                                    //@ts-ignore
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * @method matched_count
     * @param {string} filename 文件或文件夹的名字
     * @description 判断filename满足RegExp列表的个数
     * */
    Scan.prototype.matched_count = function (filename, fliters) {
        var matched = fliters.map(function (reg) {
            if (reg.test(filename))
                return 1;
            return 0;
        });
        var count = matched.reduce(function (tot, num) { return tot + num; });
        return count;
    };
    /**
     * @method get_all_files_in_dir
     * @description 获得某个文件夹过滤下的所有文件
     * */
    Scan.prototype.get_all_files_in_dir = function (path, not_include_fliters, include_fliters) {
        var __files__ = [];
        var basePath = path;
        var self = this;
        function _get(path) {
            var files = fs.readdirSync(path);
            files.map(function (file) {
                if (self.matched_count(file, not_include_fliters) > 0)
                    return;
                var filePath = path_1.default.join(path, file);
                var fileSta = fs.statSync(filePath);
                if (fileSta.isDirectory()) { // 文件夹
                    _get(filePath);
                }
                else if (fileSta.isFile()) { // 文件
                    if (self.matched_count(file, include_fliters) == 0)
                        return;
                    __files__.push({
                        path: path,
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
    };
    return Scan;
}());
exports.default = Scan;
