import {
    VALIDATE_PROPERTY_METADATA_KEY,
    VALIDATE_PROPERTY,
    BODY_METADATA_KEY,
    ResponseModel,
    REQUIRED_METADATA_KEY
} from './constant';
import 'reflect-metadata';

export function post(target, propertyName, descriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
        const that = this;
        const ctx = that['ctx'];
        const app = that['app'];
        if (ctx && app) {
            const body = ctx.request.body;
            const postParameters = Reflect.getOwnMetadata(
                BODY_METADATA_KEY,
                target.constructor,
                propertyName
            );
            if (postParameters) {
                let func = postParameters['4']['data'];
                if (typeof func === 'function') {
                    const dto = new func();
                    const postInfoMeta = Reflect.getMetadata(
                        VALIDATE_PROPERTY_METADATA_KEY,
                        dto,
                        VALIDATE_PROPERTY
                    );
                    const validateObj = {};
                    if (postInfoMeta && Array.isArray(postInfoMeta)) {
                        postInfoMeta.map(item => {
                            validateObj[item.key] = {
                                type: item.type,
                                required: item.required,
                            };
                        });
                    }
                    arguments[0] = body;
                    const responseModel = new ResponseModel();
                    const error = app.validator.validate(validateObj, body);
                    if (error) {
                        responseModel.code = '200';
                        responseModel.message = '参数错误1';
                        responseModel.success = false;
                        responseModel.data = error;
                        ctx.body = responseModel;
                        return;
                    }
                }
            }
        }
        return method.apply(this, arguments);
    };
}

export function validate(
    target,
    propertyName,
    descriptor
) {
    const method = descriptor.value;
    descriptor.value = function () {
        const requiredParameters = Reflect.getOwnMetadata(
            REQUIRED_METADATA_KEY,
            target,
            propertyName
        );
        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (
                    parameterIndex >= arguments.length ||
                    arguments[parameterIndex] === undefined
                ) {
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, arguments);
    };
}