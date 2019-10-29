"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nedb_1 = __importDefault(require("nedb"));
var Data = /** @class */ (function () {
    function Data(parent) {
        this.parent = parent;
        this.db = new nedb_1.default();
    }
    /**
     * @description 更新,不存在就加入
     * */
    Data.prototype.update = function (doc) {
        var self = this;
        return new Promise(function (res, rej) {
            self.db.update({ _id: doc._id }, doc, { upsert: true }, function (err, numReplace, upser) {
                if (err)
                    rej(err);
                else
                    res();
            });
        });
    };
    Data.prototype.findOne_by_id = function (_id) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.db.findOne({ _id: _id }, function (err, doc) {
                if (err)
                    rej(err);
                else
                    res(doc);
            });
        });
    };
    Data.prototype.count = function (query) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.db.count(query, function (err, count) {
                if (err)
                    rej(err);
                else
                    res(count);
            });
        });
    };
    /** pagenation */
    Data.prototype.pagenation = function (query, page, pageSize) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.db.find(query).sort({ update_time: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(function (err, doc) {
                if (err)
                    rej(err);
                else
                    res(doc);
            });
        });
    };
    return Data;
}());
exports.default = Data;
