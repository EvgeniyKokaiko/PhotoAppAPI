import {BaseChain} from "../internal/core/base.chain";


class ConstantsChain extends BaseChain<string> {
    constructor() {
        super("CONSTANTS");
    }

    public get constants() {
        return {
            fileNameRegexp: /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}.([a-zA-Z]{3})/gm
        }
    }

    public get usings() {
        return {};
    }

}


export {ConstantsChain}
