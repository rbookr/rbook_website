"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlClass_1 = __importDefault(require("./subClass/urlClass"));
var scanClass_1 = __importDefault(require("./subClass/scanClass"));
var DataClass_1 = __importDefault(require("./subClass/DataClass"));
var renderClass_1 = __importDefault(require("./subClass/renderClass"));
var repositoryClass_1 = __importDefault(require("./subClass/repositoryClass"));
var BookSystem = /** @class */ (function () {
    function BookSystem(opts) {
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
    BookSystem.prototype.clear = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.Db.db.remove({}, { multi: true }, function (err, numRemove) {
                if (err)
                    rej(err);
                else
                    res(numRemove);
            });
        });
    };
    /** 查找文章 */
    BookSystem.prototype.find = function (_id) {
        return this.Db.findOne_by_id(_id);
    };
    /** 渲染 */
    BookSystem.prototype.render = function (filePath, data) {
        if (data === void 0) { data = {}; }
        return this.Render.render(filePath, data);
    };
    return BookSystem;
}());
exports.default = BookSystem;
