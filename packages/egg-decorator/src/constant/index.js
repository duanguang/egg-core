export const VALIDATE_PROPERTY = 'validateProperty';
export const VALIDATE_PROPERTY_METADATA_KEY = Symbol('validateProperty');
export const BODY_METADATA_KEY = Symbol('Body');
export const REQUIRED_METADATA_KEY = Symbol('required');
export class ResponseModel {
    constructor() {
        this.message = '';
        this.success = false;
        this.data = null;
        this.code = '';
    }
}