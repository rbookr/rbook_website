"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 对git 进行pull,push,log */
const child_process_1 = require("child_process");
/** 执行 */
function execAsync(cmd, cwd) {
    return new Promise((res, rej) => {
        child_process_1.exec(cmd, { cwd }, (err, stdout, stderr) => {
            if (err)
                rej(err);
            res(stdout);
        });
    }).catch(e => {
        console.error("====== git 发生错误");
        console.error(e);
        throw (e);
    });
}
class repository {
    constructor(parent) {
        this.parent = parent;
    }
    async pull_master() {
        let out = execAsync(`git pull origin master`, this.parent.localRespository);
        return out;
    }
    async clone() {
        let cmd = `git clone ${this.parent.remoteRespository} ${this.parent.localRespository}`;
        await execAsync(cmd, '/');
    }
    async git_init() {
        let init_cmds = ['git config --global core.pager cat'];
        for (let cmd of init_cmds) {
            await execAsync(cmd, this.parent.localRespository);
        }
    }
    async last_commits(n = 10) {
        let out = await execAsync(`git log --no-merges --pretty="[%an]==== %s ===[%cr]" -n ${n}`, this.parent.localRespository);
        return out;
    }
}
exports.default = repository;
