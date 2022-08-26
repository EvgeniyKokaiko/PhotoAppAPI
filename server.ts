import cors = require("cors");
import express = require("express");
const path = require("path")
import { MorganaApplication } from "./src/internal/app";
import {threadRunner} from "./src/internal/types";
import {PostsController} from "./src/controllers/posts.controller";
import {AlbumsController} from "./src/controllers/albums.controller";

class Application extends MorganaApplication {
    constructor(PORT: number, HTTPS: boolean) {
       super(PORT, HTTPS)
    }


    public get runOnOtherThread(): threadRunner[] {
        return [];
    }

    private get corsOptions(): cors.CorsOptions {
        return {}
    }

    get useGlobalURLPath(): string {
        return "/api";
    }

    usings(): void {
       this.appInstance.use(express.json())
       this.appInstance.use(cors(this.corsOptions))
       this.appInstance.use(`${this.useGlobalURLPath}/static`, express.static('./src/storage', {}));
    }

    public get controllers(): any {
        return [PostsController, AlbumsController]
    }
}

export { Application }

