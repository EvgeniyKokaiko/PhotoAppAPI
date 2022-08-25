import {BaseDto} from "./core/Base.dto";
import {Cobol, Dto, DtoField, ErrorField, TypedCobol} from "./types";


/***
 *
 * Method which using for validations of request fields.
 *
 */
export const bindDtoWithRequest = <T extends BaseDto>(dto: {new (): T}, fields: any): TypedCobol<T> => {
    try {
        const newDto = new dto()
        if (!(newDto instanceof BaseDto)) {
            throw new Error(`Current Dto does not extends BaseDto!`)
        }
        let isError = false;
        let errorsField: Array<ErrorField> = [];
        for (let i in newDto) {
            const field: DtoField = newDto[i] as any;
            const errorField: ErrorField | any = {}
            if (fields[i] === void 0 && field.required) {
                isError = true;
                errorField.isMissing = true;
                errorField.name = i;
            }
            if (fields[i] !== void 0) {
                const isRequestFieldMin = fields[i].length <= field.min;
                const isRequestFieldMax = fields[i].length >= field.max;
                if (field.min !== void 0 && isRequestFieldMin) {
                    isError = true;
                    errorField.name = i;
                    errorField.isLessThanMin = isRequestFieldMin;
                }
                if (field.max !== void 0 && isRequestFieldMax) {
                    isError = true;
                    errorField.name = i;
                    errorField.isLongerThanMax = isRequestFieldMax;
                }
            }

            if (JSON.stringify(errorField) !== "{}") {
                errorsField.push(errorField)
            }
            if (typeof fields[i] !== "function" && fields[i] !== void 0) {
                newDto.data[i] = fields[i];
            }
        }
        return {dto: newDto, isError, errorsField, errorMessage: ""}
    } catch (ex) {
        console.log(ex)
        return {dto: new dto(), isError: true, errorsField: [], errorMessage: ex}
    }
}
