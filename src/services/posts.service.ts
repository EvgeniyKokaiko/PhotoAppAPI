import {BaseService} from "../internal/core/base.service";
import {useInjectableModel, useService} from "../internal/decorators";
import {Injected, multerFile, TypedCobol} from "../internal/types";
import {AlbumModelType, PostModelType} from "../types/model.interface";
import {Responder} from "../internal/responder";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {PagingData} from "../types";
import {chainTool} from "../internal/core/index.chain";

const PostModel = require('./../models/PostModel')

@useService('posts')
class PostsService extends BaseService {
    @useInjectableModel(PostModel)
    private readonly postsRepository: Injected<typeof PostModel>
    constructor() {
        super();
    }

    public async addPostService(cobol: TypedCobol<PostModelType>, file: multerFile, access_token: string) {
        try {
            const body = {
                title: cobol.dto.data.title,
                album_id: cobol.dto.data.album_id,
                url: file?.filename || cobol.dto.data.url,
                thumbnail: file?.filename || cobol.dto.data.thumbnail,
            }
            if (cobol.isError || access_token === void 0 || access_token === null) {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            const newItem = await this.postsRepository().build(body)
            await newItem.save();
            return Responder.giveOKResponseWithData(newItem);
        } catch (e) {
            console.log('PostsService.addPostService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }
    public async getPostsService(pagingConfig: PagingData) {
        try {
            const albums = await this.postsRepository().findAll({
                attributes: ['id', 'album_id', 'title', 'url', 'thumbnail', 'created_at', 'updated_at'],
                ...(pagingConfig.limit && {limit: pagingConfig.limit}),
                ...(pagingConfig.offset && {offset: pagingConfig.offset}),
                ...(pagingConfig.album_id && {where: {album_id: pagingConfig.album_id}})
            })
            return Responder.giveOKResponseWithData(albums);
        } catch (e) {
            console.log('PostsService.getPostsService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }
    public async updatePostService(cobol: TypedCobol<PostModelType>, file: multerFile, id: number, access_token: string) {
        try {
            const body = {
                title: cobol.dto.data.title,
                album_id: cobol.dto.data.album_id,
                url: file?.filename || cobol.dto.data.url,
                thumbnail: file?.filename || cobol.dto.data.thumbnail,
            }
            if (access_token === void 0 || access_token === null)  {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            const preUpdatedItem = await this.postsRepository().findOne({
                attributes: ['id', 'album_id', 'title', 'url', 'thumbnail', 'created_at', 'updated_at'],
                where: {
                    id
                }
            })
            if (chainTool.constants.constants.fileNameRegexp.test(preUpdatedItem.url.trim())) {
                chainTool.fsChain.removeFileByName(preUpdatedItem.url.trim())
            }
            await this.postsRepository().update(body,
                {where: {
                        id,
                    }
                })
            return Responder.giveOKResponseWithData(body);
        } catch (e) {
            console.log('PostsService.updatePostService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }
    public async deletePostService(id: number, access_token: string) {
        try {
            if (access_token === void 0 || access_token === null) {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            const preRemovedItem = await this.postsRepository().findOne({
                attributes: ['id', 'album_id', 'title', 'url', 'thumbnail', 'created_at', 'updated_at'],
                where: {
                    id
                }
            })
            if (chainTool.constants.constants.fileNameRegexp.test(preRemovedItem.url.trim())) {
                chainTool.fsChain.removeFileByName(preRemovedItem.url.trim())
            }
            await this.postsRepository().destroy({
                where: {
                    id,
                }
            })
            return Responder.giveOKResponseWithData(preRemovedItem);
        } catch (e) {
            console.log('PostsService.deletePostService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }
}


export { PostsService }
