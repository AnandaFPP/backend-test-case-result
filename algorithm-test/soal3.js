function checkSameData (list, query) {
    let result = [];

    for (let i = 0; i < query.length; i++) {
        let count = 0;
        for (let j = 0; j < list.length; j++) {
            if (query[i] === list[j]) {
                count++
            }
        }
        result.push(count);
    }
    return result;
}

console.log(checkSameData(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']))