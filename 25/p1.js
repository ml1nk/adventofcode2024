const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const items = data.split("\n\n")

const keys = []
const locks = []


for(const item of items) {
    let rows = item.split("\n")

    let key = rows[0][0] !== "#"

    rows = rows.slice(1,-1)


    const d = Array(5).fill(0)

    for(const row of rows) {
        for(let i=0;i<d.length; i++) {
            console.log(row, row[i])
            if(row[i] === (key ? "#" : ".")) d[i]+=1
        }
    }

    (key? keys : locks).push(d)
}

let sum = 0

for(const lock of locks) {
    outer:
    for(const key of keys) {
        for(let i=0;i<key.length; i++) {
            if(lock[i]<key[i]) continue outer
        }  
        sum += 1
    }
}


console.log("part1", sum)