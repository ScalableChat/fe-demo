export function groupBy<T>(
    list: T[],
    keyGetter: (data: T) => string | number,
) {
    const map = new Map<string | number, T[]>()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map
}