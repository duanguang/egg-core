import 'reflect-metadata';
import {
    VALIDATE_PROPERTY_METADATA_KEY,
    VALIDATE_PROPERTY
} from './constant';
export function validateProperty(options) {
    /* return Reflect.metadata(validatePropertyMetadataKey, { ...options }); */
    return (target, key) => {
        let old = Reflect.getMetadata(
            VALIDATE_PROPERTY_METADATA_KEY,
            target,
            VALIDATE_PROPERTY
        );
        if (!old) {
            old = [];
        }
        old.push({
            ...options,
            key,
        });
        Reflect.defineMetadata(
            VALIDATE_PROPERTY_METADATA_KEY,
            old,
            target,
            VALIDATE_PROPERTY
        );
    };
}