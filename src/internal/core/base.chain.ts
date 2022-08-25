export abstract class BaseChain<T> {
    protected _lib: T
    protected constructor(mLib: T) {
        this._lib = mLib;
    }

    public get lib(): T {
        return this._lib;
    }

    public abstract get usings(): {[key: string]: any}
}