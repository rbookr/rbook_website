"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlClass_1 = __importDefault(require("./subClass/urlClass"));
var scanClass_1 = __importDefault(require("./subClass/scanClass"));
var DataClass_1 = __importDefault(require("./subClass/DataClass"));
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
    return BookSystem;
}());
exports.default = BookSystem;
