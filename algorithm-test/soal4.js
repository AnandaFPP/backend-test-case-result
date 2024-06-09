function diagonalResult (matrix) {
    let diagonalPertama = 0;
    let diagonalKedua = 0;
    const n = matrix.length;
    
    for (let i = 0; i < n; i++) {
        diagonalPertama += matrix[i][i];
        diagonalKedua += matrix[i][n - i - 1];
        console.log(diagonalKedua)
    }
    
    return Math.abs(diagonalPertama - diagonalKedua);
}

console.log(diagonalResult([[1, 2, 0], [4, 5, 6], [7, 8, 9]]))