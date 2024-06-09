function reverseTheWord (str) {
    let kata = str.slice(0, -1);
    let angka = str.slice(-1);

    return kata.split('').reverse().join('') + angka;
}

console.log(reverseTheWord("NEGIE1"))