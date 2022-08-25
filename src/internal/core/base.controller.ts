import {BaseService} from "./base.service";
import {Router} from "express";
import {BaseDto} from "./Base.dto";
import {bindDtoWithRequest} from "../dto";
const express = require('express');

type Service<T extends BaseService> = {}

interface BaseControllerType {
    __unsafe__group?: string;
}

export abstract class BaseController<T extends BaseService> implements BaseControllerType {
    protected static _expressRouter: Router = new express.Router()
    public __unsafe__group: string;
    protected constructor() {
        this.__unsafe__group = 'api';
    }
    public get router() {
        return BaseController._expressRouter;
    }

    public bindJSON = <T extends BaseDto>(dto: {new (): T}, body: any) => {
        return bindDtoWithRequest(dto, body)
    }


    protected joinRoute = (...endUrls: string[]) => {
        let result = `/${this.__unsafe__group}/`
        for (let i of endUrls) {
            result += `${i}/`
        }
        return result
    }

}