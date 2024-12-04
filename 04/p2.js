const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const matrix = data.split("\n")

let matches = 0

for (let i = 0; i < matrix.length; i++) {
    for (let p = 0; p < matrix[i].length; p++) {
        if (matrix[i]?.[p] === "A" && matchtype1(i, p) && matchtype2(i, p)) {
            matches++
        }
    }
}


function matchtype1(i, p) {
    return (
        (matrix[i - 1]?.[p - 1] === "M" && matrix[i + 1]?.[p + 1] === "S") ||
        (matrix[i - 1]?.[p - 1] === "S" && matrix[i + 1]?.[p + 1] === "M")
    )
}


function matchtype2(i, p) {
    return (
        (matrix[i + 1]?.[p - 1] === "M" && matrix[i - 1]?.[p + 1] === "S") ||
        (matrix[i + 1]?.[p - 1] === "S" && matrix[i - 1]?.[p + 1] === "M")
    )
}

console.log("part2", matches)