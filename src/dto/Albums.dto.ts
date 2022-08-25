import {BaseDto} from "../internal/core/Base.dto";
import {DtoField} from "../internal/types";


class AlbumsDto extends BaseDto {
    private readonly name: DtoField
    constructor() {
        super();
        this.name = {
            type: "STRING",
            min: 5,
            max: 40,
            required: true,
        }
    }
}

export { AlbumsDto }
