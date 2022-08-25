import {__UNSAFE_DATA, Dto, METHODS, multerConfig, multerMethods} from "./types";
import {bindDtoWithRequest} from "./dto";
import {randomUUID} from "crypto";
const path = require('path');






/***
 *
 * The TypeScript decorator documentation specifies the order:
 * 1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
 * 2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
 * 3. Parameter Decorators are applied for the constructor.
 * 4. Class Decorators are applied for the class
 *
 *
 * @param path
 * @param method
 */


/**
 * Main decorator for controller. It's predefine a lot of different options such base method(ex. get, post, etc.),
 * path for endpoint, middleware array which will be pushed inside a express router, dto middleware, tokens middleware
 * @param path
 * @param method
 */

export function useRoute(path: string, method: METHODS) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        const unsafeData: __UNSAFE_DATA = {
            __unsafe__group: "",
            method: method,
            path: path,
            middlewares: [],
            __unsafe__dto: (req, res, next) => {
                next()
            },
            __unsafe__tokens: (req, res, next) => {
                next()
            }
        }
        target[key].__unsafe_data = unsafeData;
    }
}


/***
 *
 * @param group
 * using to define a controller, and define a group for routes
 * use it without any parenthesis, only word!
 */
export function useController(group: string): any {
    return (target: any) => {
        if (target === void 0) {
            throw new Error('this controller is not correct!')
        }
        target.prototype.__unsafe__group = group;
    }
}


/**
 * Using for defining difference middlewares such as auth middleware(parsing, transforming and etc.)
 * @param middlewareCallback
 */
export function useMiddleware(middlewareCallback: Function) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0 || middlewareCallback === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).middlewares = [...(<__UNSAFE_DATA>target[key].__unsafe_data).middlewares, middlewareCallback];
    }
}


/**
 * Using for check request fields (ex - is field required) and return a Cobol object inside a response which has error fields, data.
 *
 */

export function useDto(dto: any) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).__unsafe__dto = (req, res, next) => {
            res.cobol = bindDtoWithRequest(dto, req.body)
            next()
        }
    }
}

/**
 * Using for parse header and return a tokens field inside response (see MorganaResponse inside types file)
 *
 */
export function useTokens(useOnlyAccess: boolean = false, accessWord: string, refreshWord: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).__unsafe__tokens = (req, res, next) => {
            const emptyTokens = {
                access: null,
                ...(!useOnlyAccess && {refresh: null}),
            }
            const reqHeader_refresh = req.header('refresh_token')
            const reqHeader_access = req.header('access_token')
            console.log("[Morgana]: access_token::", reqHeader_access, "[Morgana]: refresh_token::", reqHeader_refresh)
            if (reqHeader_access !== void 0) {
                if (!useOnlyAccess && reqHeader_refresh !== void 0) {
                    const refresh_split = reqHeader_refresh.split(" ")
                    if (refresh_split.length > 1 && refresh_split[0] === refreshWord) {
                        emptyTokens.refresh = refresh_split[1];
                    }
                }
                const access_split = reqHeader_access.split(" ")
                if (access_split.length > 1 && access_split[0] === accessWord) {
                    emptyTokens.access = access_split[1];
                }
            }
            res.tokens = emptyTokens;
            next()
        }
    }
}

/**
 * Using for defining field inside service class as database model
 *
 */
export function useInjectableModel(model: object | Function): any {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (typeof model !== 'function') {
            throw new Error('Model is not implemented database table!')
        }
            target[key] = () => {
                if (target.constructor['unsafe__name'] !== void 0) {
                    return model
                } else {
                    throw new Error("You need to wrap your service class with useService decorator")
                }
            }
    }
}


/**
 * Using for defining a service
 *
 */
export function useService(name: string) {
    return (target: any) => {
        target['unsafe__name'] = name;
    }
}


/***
 * Example of fileFilter
 * fileFilter(req, file, cb) {
 *             if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
 *                 return cb(new Error('Please upload an image'))
 *             }
 *
 *             cb(undefined, true)
 *         }
 */

/***
 *
 * Using for parsing multipart/form-data
 * NEED TO INSTALL MULTER PACKAGE!
 *
 */

export function useFile(name: string, method: multerMethods, config: multerConfig) {
    const multer  = require('multer')
    const upload = multer({
        storage: method !== "NONE" ? multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, config.dest)
            },
            filename: function (req, file, cb) {
                const filename = config.useUuid ? `${randomUUID()}${path.extname(file.originalname)}` : `${Date.now()}-${file.originalname}`
                cb(null, filename)
            }
        }) : void 0,
        limits: {
            fileSize: config.limit
        },
    ...(config.fileFilter && {fileFilter: config.fileFilter})
    })
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const data = target[key].__unsafe_data;
        if (data === void 0 || data === null) {
            throw new Error('Please provide useRoute decorator first, before using useFile decorator!')
        }
        let fileMdlwr = null;
        switch (method) {
            case "ARRAY":
                fileMdlwr = (() => (upload.array(name, config.length)))()
                break
            case "SINGLE":
                fileMdlwr = (() => (upload.single(name)))()
                break
            case "FIELDS":
                fileMdlwr = (() => (upload.fields(config.fields)))()
                break
            case "NONE":
                fileMdlwr = (() => (upload.none()))()
                break
            default:
                fileMdlwr = (() => null)()
                break
        }
        data.middlewares.push(fileMdlwr)
    }
}
