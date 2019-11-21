"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = __importDefault(require("ejs"));
var path_1 = __importDefault(require("path"));
var md = require("../../../markdown-r");
var RenderClass = /** @class */ (function () {
    function RenderClass(parent) {
        this.parent = parent;
    }
    RenderClass.prototype.ejsRender = function (path, data) {
        if (data === void 0) { data = {}; }
        return new Promise(function (res, rej) {
            ejs_1.default.renderFile(path, data, {}, function (err, str) {
                if (err)
                    rej(err);
                else
                    res(str);
            });
        });
    };
    RenderClass.prototype.render = function (path, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var filePath = path;
        if (!path_1.default.isAbsolute(filePath))
            filePath = path_1.default.join(this.parent.localRespository, filePath);
        var at_repo_filePath = "/" + path_1.default.relative(this.parent.localRespository, path_1.default.dirname(filePath));
        return this.ejsRender(path, data).then(function (str) {
            return _this.imagePath_translate(
            //@ts-ignore
            md.render(_this.parent.Scan.splitStr(str).content), at_repo_filePath);
        }).then(function (str) {
            return _this.linkPath_translate(str, at_repo_filePath);
        });
    };
    /* 转换imagepath */
    RenderClass.prototype.imagePath_translate = function (html, path) {
        var cur_path = path || '/';
        if (cur_path.charAt(cur_path.length - 1) !== '/') //最后一个字符
            cur_path += '/';
        var image_reg = /<img src="([\S\s]+?)"/g;
        return html.replace(image_reg, function ($1, $2) {
            var rep_str = "";
            if ($2.substring(0, 2) == './') {
                rep_str = cur_path + $2.slice(2);
            }
            else if ($2.substring(0, 3) == '/./')
                $2 = $2.slice(1);
            else if ($2.substring(0, 7) == "http://" || $2.substring(0, 8) == "https://")
                rep_str = $2;
            else if ($2.charAt(0) === '/') {
                rep_str = $2;
            }
            else
                rep_str = cur_path + $2;
            return "<img src=\"" + rep_str + "\"";
        });
    };
    /** 转换 a.href */
    RenderClass.prototype.linkPath_translate = function (html, path) {
        var cur_path = path || '/';
        if (cur_path.charAt(cur_path.length - 1) !== '/') //最后一个字符
            cur_path += '/';
        var link_reg = /<a href="([\S\s]+?)"/g;
        return html.replace(link_reg, function ($1, $2) {
            var rep_str = "";
            if ($2.substring(0, 2) == './') {
                rep_str = cur_path + $2.slice(2);
            }
            else if ($2.substring(0, 3) == '/./')
                $2 = $2.slice(1);
            else if ($2[0] === '#' || $2.substring(0, 7) == "http://" || $2.substring(0, 8) == "https://")
                rep_str = $2;
            else if ($2.charAt(0) === '/') {
                rep_str = $2;
            }
            else
                rep_str = cur_path + $2;
            return "<a href=\"" + rep_str + "\"";
        });
    };
    return RenderClass;
}());
exports.default = RenderClass;
