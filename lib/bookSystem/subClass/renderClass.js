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
    RenderClass.prototype.ejsRender = function (path) {
        return new Promise(function (res, rej) {
            ejs_1.default.renderFile(path, {}, {}, function (err, str) {
                if (err)
                    rej(err);
                else
                    res(str);
            });
        });
    };
    RenderClass.prototype.render = function (path) {
        var _this = this;
        var filePath = path;
        if (!path_1.default.isAbsolute(filePath))
            filePath = path_1.default.join(this.parent.localRespository, filePath);
        return this.ejsRender(path).then(function (str) {
            //@ts-ignore
            return md.render(_this.parent.Scan.splitStr(str).content);
        });
    };
    return RenderClass;
}());
exports.default = RenderClass;
