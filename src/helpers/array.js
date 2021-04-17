export const reorder = (array, fromIndex, toIndex) => {
    const newArr = [...array];

    const item = newArr.splice(fromIndex, 1)[0];
    newArr.splice(toIndex, 0, item);

    return newArr;
}