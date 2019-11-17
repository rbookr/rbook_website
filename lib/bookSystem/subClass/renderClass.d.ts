declare class RenderClass {
    parent: bookSystem;
    constructor(parent: bookSystem);
    ejsRender(path: string, data?: {}): Promise<unknown>;
    render(path: string, data?: {}): Promise<string>;
    imagePath_translate(html: string, path: string): string;
}
export default RenderClass;
