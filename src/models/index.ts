const AlbumModel = require('./AlbumModel')
const PostModel = require('./PostModel')

export enum models {
    albums = AlbumModel,
    posts = PostModel,
}

/***
 * Function use for sync all database tables as relation tree
 *
 */

export async function SyncModels() {
    AlbumModel.sync().then(() => {
        PostModel.sync()
    })
}
