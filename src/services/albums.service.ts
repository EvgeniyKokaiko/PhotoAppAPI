import {BaseService} from "../internal/core/base.service";
import {useInjectableModel, useService} from "../internal/decorators";
import {Cobol, Injected, TypedCobol} from "../internal/types";
import {Responder} from "../internal/responder";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {AlbumModelType} from "../types/model.interface";

const AlbumModel = require('./../models/AlbumModel')

@useService('albums')
class AlbumsService extends BaseService {
    @useInjectableModel(AlbumModel)
    private readonly albumRepository: Injected<typeof AlbumModel>;
    constructor() {
        super();
    }

    public async addAlbumService(cobol: TypedCobol<AlbumModelType>, access_token: string) {
        try {
            const body = {
                name: cobol.dto.data.name,
            }
            if (cobol.isError || access_token === void 0 || access_token === null) {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            const newItem = await this.albumRepository().build(body)
            await newItem.save();
            return Responder.giveOKResponseWithData(newItem);
        } catch (e) {
            console.log('AlbumsService.addAlbumService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

    public async getAlbumsService() {
        try {
            const albums = await this.albumRepository().findAll({
                attributes: ["id", 'name', 'created_at', 'updated_at']
            })
            return Responder.giveOKResponseWithData(albums);
        } catch (e) {
            console.log('AlbumsService.getAlbumsService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

    public async removeAlbumService(id: number, access_token: string) {
        try {
            if (access_token === void 0 || access_token === null) {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            await this.albumRepository().destroy({
                where: {
                    id,
                }
            })
            return Responder.giveOKResponse();
        } catch (e) {
            console.log('AlbumsService.removeAlbumService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

    public async updateAlbumService(cobol: TypedCobol<AlbumModelType>, id: number, access_token: string) {
        try {
            if (access_token === void 0 || access_token === null) {
                return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
            }
            const newItem = await this.albumRepository().update({
                name: cobol.dto.data.name,
            },
                {where: {
                    id,
                }
            })
            return Responder.giveOKResponseWithData(newItem);
        } catch (e) {
            console.log('AlbumsService.updateAlbumService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

}


export { AlbumsService }
