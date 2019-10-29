declare class RenderClass {
    parent: bookSystem;
    constructor(parent: bookSystem);
    ejsRender(path: string): Promise<unknown>;
    render(path: string): Promise<string>;
    imagePath_translate(html: string, path: string): string;
}
export default RenderClass;
