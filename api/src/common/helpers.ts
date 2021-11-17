export function stringToList(stringArray: string) {
    return stringArray.split(",").map(sa => parseInt(sa));
}