"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const path_1 = __importDefault(require("path"));
class url {
    constructor(parent) {
        this.parent = parent;
    }
    url_to_id(url) {
        return path_1.default.basename(url);
    }
    id_2_url(_id) {
        return `article/${_id}`;
    }
    /**
     * @description 根据给定的路径,返会文章id
     * */
    path_2_id(resolve_path) {
        //@ts-ignore
        let info = this.parent.Scan.split(resolve_path);
        let _id = info.head._id || md5_1.default(resolve_path); //md5 ?
        return _id;
    }
    path_2_url(resolve_path) {
        return this.id_2_url(this.path_2_id(resolve_path));
    }
}
exports.default = url;
