"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var md5_1 = __importDefault(require("md5"));
var path_1 = __importDefault(require("path"));
var url = /** @class */ (function () {
    function url(parent) {
        this.parent = parent;
    }
    url.prototype.url_to_id = function (url) {
        return path_1.default.basename(url);
    };
    url.prototype.id_2_url = function (_id) {
        return "article/" + _id;
    };
    /**
     * @description 根据给定的路径,返会文章id
     * */
    url.prototype.path_2_id = function (resolve_path) {
        //@ts-ignore
        var info = this.parent.Scan.split(resolve_path);
        var _id = info._id || md5_1.default(resolve_path);
        return _id;
    };
    url.prototype.path_2_url = function (resolve_path) {
        return this.id_2_url(this.path_2_id(resolve_path));
    };
    return url;
}());
exports.default = url;
