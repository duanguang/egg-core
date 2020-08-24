export interface IValidateProperty {
  type:
    | 'string'
    | 'number'
    | 'dateTime'
    | 'date'
    | 'boolean'
    | 'bool'
    | 'url'
    | 'array';
  required: boolean;
}

/**
 * 验证规则属性注解
 *
 * 主要代替egg validate
 * @export
 * @param {IValidateProperty} options
 * @returns {({
 *   (target: Function): void;
 *   (target: Object, propertyKey: string | symbol): void;
 * })}
 */
export declare function validateProperty(
  options: IValidateProperty
): {
  (target: Function): void;
  (target: Object, propertyKey: string | symbol): void;
};
