declare class url {
    parent: bookSystem;
    constructor(parent: bookSystem);
    url_to_id(url: string): string;
    id_2_url(_id: string): string;
    /**
     * @description 根据给定的路径,返会文章id
     * */
    path_2_id(resolve_path: string): any;
    path_2_url(resolve_path: string): string;
}
export default url;
