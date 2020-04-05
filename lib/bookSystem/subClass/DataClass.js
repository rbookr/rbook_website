"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(require("nedb"));
class Data {
    constructor(parent) {
        this.parent = parent;
        this.db = new nedb_1.default();
    }
    /**
     * @description 更新,不存在就加入
     * */
    update(doc) {
        let self = this;
        return new Promise((res, rej) => {
            self.db.update({ _id: doc._id }, doc, { upsert: true }, (err, numReplace, upser) => {
                if (err)
                    rej(err);
                else
                    res();
            });
        });
    }
    findOne_by_id(_id) {
        return new Promise((res, rej) => {
            this.db.findOne({ _id }, (err, doc) => {
                if (err)
                    rej(err);
                else
                    res(doc);
            });
        });
    }
    count(query) {
        return new Promise((res, rej) => {
            this.db.count(query, function (err, count) {
                if (err)
                    rej(err);
                else
                    res(count);
            });
        });
    }
    /** 得到所有的tag */
    get_all_tags() {
        return new Promise((res, rej) => {
            this.db.find({}, {}, (err, docs) => {
                let set = new Set();
                docs.map((doc) => {
                    //@ts-ignore
                    if (doc.head.tags) {
                        //@ts-ignore
                        doc.head.tags.map(tag => { set.add(tag); });
                    }
                });
                res(Array.from(set));
            });
        });
    }
    /** pagenation */
    pagenation(query, page, pageSize) {
        return new Promise((res, rej) => {
            this.db.find(query).sort({ update_time: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec((err, doc) => {
                if (err)
                    rej(err);
                else
                    res(doc);
            });
        });
    }
}
exports.default = Data;
