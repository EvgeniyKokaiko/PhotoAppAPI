import {BaseModelType} from "../internal/core/base.interface";

export interface AlbumModelType extends BaseModelType {
   name: string;
}

export interface PostModelType extends BaseModelType {
    album_id: number //@reference to AlbumModel id One-to-Many;
    title: string;
    url: string;
    thumbnail: string;
}
