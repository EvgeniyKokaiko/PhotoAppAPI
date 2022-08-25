import {BaseChain} from "../internal/core/base.chain";

const fs = require('fs')

class FsChain extends BaseChain<typeof fs> {
    constructor() {
        super(fs);
    }

    public removeFileByName = (name: string) => {
        try {
            this.lib.unlinkSync(this.usings.path.join(__dirname, '../storage/', name))
        } catch (e) {
            console.log('FsChain.removeFileById ex', e)
        }
    }

    public get usings() {
        return {path: require('path')};
    }
}


export { FsChain }
