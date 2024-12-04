const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const matrix = data.split("\n")

let matches = 0
let word = "XMAS"

for(let i=0; i<matrix.length; i++) {
    for(let p=0; p<matrix[i].length; p++) {
        
        for(let ic=-1; ic<2; ic++) {
            for(let pc=-1; pc<2; pc++) {
                if(ic===0 && pc===0) continue
                match(i,p, ic, pc, word)
            }
        }

    }
}


function match(i, p, ic, pc, word) {
    if (matrix[i]?.[p] !== word[0]) return
    word = word.slice(1)
    if(word.length === 0) {
        matches++
        return
    }

    match(i+ic,p+pc, ic, pc, word)
}

console.log("part1", matches)