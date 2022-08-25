import {ReasonPhrases, StatusCodes} from "http-status-codes";


export class Responder {
    public static giveResponse(statusCode: StatusCodes, statusMessage: ReasonPhrases) {
        return {
            statusCode,
            statusMessage,
        }
    }

    public static giveResponseWithData<T>(statusCode: StatusCodes, statusMessage: ReasonPhrases, data: T) {
        return {
            statusCode,
            statusMessage,
            data,
        }
    }

    public static giveOKResponse() {
        return {
            statusCode: StatusCodes.OK,
            statusMessage: ReasonPhrases.OK,
        }
    }

    public static giveOKResponseWithData<T>(data: T) {
        return {
            statusCode: StatusCodes.OK,
            statusMessage: ReasonPhrases.OK,
            data
        }
    }
}