"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlClass_1 = __importDefault(require("./subClass/urlClass"));
const scanClass_1 = __importDefault(require("./subClass/scanClass"));
const DataClass_1 = __importDefault(require("./subClass/DataClass"));
const renderClass_1 = __importDefault(require("./subClass/renderClass"));
const repositoryClass_1 = __importDefault(require("./subClass/repositoryClass"));
class BookSystem {
    constructor(opts) {
        this.remoteRespository = opts.remoteRespository;
        this.localRespository = opts.localRespository;
        this.catalogueEnterPoints = opts.catalogueEnterPoints;
        this.scanCatalogue = opts.scanCatalogue;
        this.scanAllRespository = opts.scanAllRespository;
        this.Scan = new scanClass_1.default(this);
        this.Url = new urlClass_1.default(this);
        this.Db = new DataClass_1.default(this);
        this.Render = new renderClass_1.default(this);
        this.Repository = new repositoryClass_1.default(this);
    }
    /** 清空数据库 */
    clear() {
        return new Promise((res, rej) => {
            this.Db.db.remove({}, { multi: true }, (err, numRemove) => {
                if (err)
                    rej(err);
                else
                    res(numRemove);
            });
        });
    }
    /** 查找文章 */
    find(_id) {
        return this.Db.findOne_by_id(_id);
    }
    /** 渲染 */
    render(filePath, data = {}) {
        return this.Render.render(filePath, data);
    }
}
exports.default = BookSystem;
