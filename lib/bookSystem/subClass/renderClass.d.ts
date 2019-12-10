declare class RenderClass {
    parent: bookSystem;
    constructor(parent: bookSystem);
    ejsRender(path: string, data?: {}): Promise<unknown>;
    render(path: string, data?: {}, template?: boolean): Promise<string>;
    imagePath_translate(html: string, path: string): string;
    /** 转换 a.href */
    linkPath_translate(html: string, path: string): string;
}
export default RenderClass;
