import 'reflect-metadata';
import {
    BODY_METADATA_KEY
} from './constant';
import {
    assignMetadata
} from './utils';
const createBodyDecorator = function (paramtype) {
    return function (data) {
        return function (target, key, index) {
            const args =
                Reflect.getMetadata(BODY_METADATA_KEY, target.constructor, key) || {};
            const paramData = data ? data : undefined;
            Reflect.defineMetadata(
                BODY_METADATA_KEY,
                assignMetadata(args, paramtype, index, paramData),
                target.constructor,
                key
            );
        };
    };
};
export function Body(property) {
    return createBodyDecorator(4)(property);
}