export function assignMetadata(args, paramtype, index, data) {
    return Object.assign(Object.assign({}, args), {
        [`${paramtype}`]: {
            index,
            data,
        },
    });
}