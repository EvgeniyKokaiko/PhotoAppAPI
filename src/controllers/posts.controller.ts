import {BaseController} from "../internal/core/base.controller";
import {useController, useDto, useFile, useRoute, useTokens} from "../internal/decorators";
import {PostsService} from "../services/posts.service";
import {MorganaRequest, MorganaResponse} from "../internal/types";
import {AddPostsDto, UpdatePostsDto} from "../dto/Posts.dto";
import { PagingData } from "../types";
const path = require('path');



@useController("posts")
class PostsController extends BaseController<PostsService> {
    constructor(private postsService: PostsService) {
        super();
        this.postsService = new PostsService();
    }

    @useTokens(true, 'Bearer', null)
    @useFile('image', "SINGLE", {dest: path.join(__dirname, '../storage/'), useUuid: true})
    @useDto(AddPostsDto)
    @useRoute('/add', 'post')
    private async AddPost(request: MorganaRequest, response: MorganaResponse) {
        response.send(await this.postsService.addPostService(response.cobol, request.file, response.tokens.access))
    }

    @useTokens(true, 'Bearer', null)
    @useRoute('/remove/:id', 'delete')
    private async RemovePost(request: MorganaRequest, response: MorganaResponse) {
        response.send(await this.postsService.deletePostService(+request.params.id, response.tokens.access))
    }

    @useTokens(true, 'Bearer', null)
    @useRoute('/get', 'get')
    private async GetPost(request: MorganaRequest, response: MorganaResponse) {
        const paging: PagingData = {
            limit: +request.query.limit,
            offset: +request.query.offset,
            album_id: +request.query.album_id
        }
        response.send(await this.postsService.getPostsService(paging))
    }

    @useFile('image', "SINGLE", {dest: path.join(__dirname, '../storage/'), useUuid: true})
    @useTokens(true, 'Bearer', null)
    @useDto(UpdatePostsDto)
    @useRoute('/update/:id', 'put')
    private async UpdatePost(request: MorganaRequest, response: MorganaResponse) {
        response.send(await this.postsService.updatePostService(response.cobol, request.file, +request.params.id, response.tokens.access))
    }

}


export { PostsController }
