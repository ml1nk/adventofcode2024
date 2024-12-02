const fs = require('fs');

const data = fs.readFileSync('./input.txt',    { encoding: 'utf8', flag: 'r' });

const rows = data.split("\n").map(e=>e.split(" ").map(e=>parseInt(e)))

let safecount = 0;

for(const row of rows) {

    // make sure grow is correct independant of a single mistake
    let growcount = 0
    for(let i=1; i<row.length; i++) {
        growcount+= (row[i]-row[i-1])>0 ? 1 : 0
    }

    let grow = false
    if(growcount > row.length/2) {
        grow = true
    }

    let safe = true

    for(let i=1; i<row.length; i++) {
        if(!isSafe(grow, row[i-1], row[i])) {
            const copyRow = [...row]
            row.splice(i-1, 1)
            copyRow.splice(i, 1)

            // ignore first error and try both variants
            safe = isSafeRow(grow, row) || isSafeRow(grow, copyRow)
            break;
        }
    }

    if(safe) safecount++;
}

console.log("part2", safecount)



function isSafeRow(grow, row) {
    for(let i=1; i<row.length; i++) {
        if(!isSafe(grow, row[i-1], row[i])) {
            return false
        }
    }
    return true
}


function isSafe(grow, first, second) {
    let dif = second-first

    // all increasing or all decreasing
    if(
        (grow && dif<0) || 
        (!grow && dif>0)
    ) {
        return false
    }

    dif = Math.abs(dif)

    // differ by at least one or at most three
    if(dif < 1 || dif > 3) {
       return false
    }

    return true
}