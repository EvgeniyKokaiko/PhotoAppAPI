import {BaseController} from "../internal/core/base.controller";
import {useController, useDto, useRoute, useTokens} from "../internal/decorators";
import {AlbumsService} from "../services/albums.service";
import {MorganaResponse} from "../internal/types";
import {Request} from "express";
import {AlbumsDto} from "../dto/Albums.dto";

@useController('albums')
class AlbumsController extends BaseController<AlbumsService> {
    constructor(private albumService: AlbumsService) {
        super();
        this.albumService = new AlbumsService();
    }

    @useTokens(true, 'Bearer', null)
    @useDto(AlbumsDto)
    @useRoute('/add', 'post')
    private async AddAlbum(request: Request, response: MorganaResponse) {
        response.send(await this.albumService.addAlbumService(response.cobol, response.tokens.access))
    }

    @useTokens(true, 'Bearer', null)
    @useRoute('/remove/:id', 'delete')
    private async RemoveAlbum(request: Request, response: MorganaResponse) {
        response.send(await this.albumService.removeAlbumService(+request.params.id, response.tokens.access))
    }

    @useTokens(true, 'Bearer', null)
    @useRoute('/get', 'get')
    private async GetAlbum(request: Request, response: MorganaResponse) {
        response.send(await this.albumService.getAlbumsService());
    }

    @useTokens(true, 'Bearer', null)
    @useDto(AlbumsDto)
    @useRoute('/update/:id', 'put')
    private async UpdateAlbum(request: Request, response: MorganaResponse) {
        response.send(await this.albumService.updateAlbumService(response.cobol, +request.params.id, response.tokens.access));
    }
}


export { AlbumsController }
