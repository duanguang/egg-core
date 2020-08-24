/**
 * post 注解
 *
 * 标记控制器API接口操作为post
 */
export declare function post(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
);

/**
 * 必填参数校验修饰器
 *
 * 结合 required 修饰器一起使用
 * @export
 * @param {*} target
 * @param {string} propertyName
 * @param {TypedPropertyDescriptor<any>} descriptor
 */
export declare function validate(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
);
