import {BaseDto} from "../internal/core/Base.dto";
import {DtoField} from "../internal/types";


export class UpdatePostsDto extends BaseDto {
    private readonly title: DtoField;
    private readonly album_id: DtoField;
    private readonly url: DtoField;
    private readonly thumbnail: DtoField;
    constructor() {
        super();
        this.title = {
            required: false,
            min: 5,
            max: 100,
            type: "STRING",
        };
        this.album_id = {
            required: false,
            type: "NUMBER",
        };
        this.url = {
            required: false,
            type: "STRING",
        };
        this.thumbnail = {
            required: false,
            type: "STRING",
        };
    }
}

export class AddPostsDto extends BaseDto {
    private readonly title: DtoField;
    private readonly album_id: DtoField;
    private readonly url: DtoField;
    private readonly thumbnail: DtoField;
    constructor() {
        super();
        this.title = {
            required: true,
            min: 5,
            max: 100,
            type: "STRING",
        };
        this.album_id = {
            required: true,
            type: "NUMBER",
        };
        this.url = {
            required: false,
            type: "STRING",
        };
        this.thumbnail = {
            required: false,
            type: "STRING",
        };
    }
}
