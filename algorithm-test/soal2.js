function checkLongestWord (sentences) {
    let result = "";

    let words = sentences.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > result.length) {
            result = words[i]
        }
    }

    return `Hasil = "${result}" sebanyak ${result.length} huruf`;
}

console.log(checkLongestWord("Saya sangat senang mengerjakan soal algoritma"))