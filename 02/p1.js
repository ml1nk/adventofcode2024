const fs = require('fs');

const data = fs.readFileSync('./input.txt',    { encoding: 'utf8', flag: 'r' });

const rows = data.split("\n").map(e=>e.split(" ").map(e=>parseInt(e)))

let safecount = 0;

for(const row of rows) {
    const grow = (row[1]-row[0])>0


    let safe = true
    
    for(let i=1; i<row.length; i++) {
        
        let dif = row[i]-row[i-1]

        // all increasing or all decreasing
        if(
            (grow && dif<0) || 
            (!grow && dif>0)
        ) {
            safe = false;
            break;
        }

        dif = Math.abs(dif)

        // differ by at least one or at most three
        if(dif < 1 || dif > 3) {
            safe = false;
            break;
        }

    }


    if(safe) safecount++;
}

console.log("part1", safecount)