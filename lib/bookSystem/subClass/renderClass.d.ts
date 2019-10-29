declare class RenderClass {
    parent: bookSystem;
    constructor(parent: bookSystem);
    ejsRender(path: string): Promise<unknown>;
    render(path: string): Promise<any>;
}
export default RenderClass;
