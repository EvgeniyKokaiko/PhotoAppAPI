import {FsChain} from "../../chain/fs.chain";
import {ConstantsChain} from "../../chain/constants.chain";

export const chainTool = {
    fsChain: new FsChain(),
    constants: new ConstantsChain()
}
