declare class repository {
    parent: bookSystem;
    constructor(parent: bookSystem);
    pull_master(): Promise<unknown>;
    clone(): Promise<void>;
    git_init(): Promise<void>;
    last_commits(n?: number): Promise<unknown>;
}
export default repository;
