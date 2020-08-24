/**
 * Body 注解
 *
 * 放在函数参数,可以直接获取接口请求body部分数据
 *
 * 结合post修饰器一起使用 */
export declare function Body(
  property?: string | number | Object
): (target: any, key: string, index: number) => void;

/**
 * 必填参数
 *
 * 设置参数为必填参数
 * @export
 * @param {*} target
 * @param {string} key
 * @param {number} index
 */
export declare function required(target: any, key: string, index: number);
