export function parseSearch(search: string, key: string): string {
    let map = new Map()
    let splitArray = search.slice(1).split("=")
    for (let i = 0; i < splitArray.length; i += 2) {
        map.set(splitArray[i], splitArray[i+1])
    }
    return map.get(key) || ''
}
