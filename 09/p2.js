const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const description = data.split("").map((e,i) => {
    if(i%2 === 0) {
        return { v: parseInt(e), i: i/2}
    }

    return parseInt(e)
})


for(let i=description.length-2+(description.length%2); i>0; i=i-2) {
    for(let p=1; p<i; p=p+2) {
        if(description[p]>=description[i].v) {
            description.splice(p, 1, 0, description[i], description[p]-description[i].v)
            p = p+2
            i = i+2
            const d = description.splice(i,2)
            description[i-1] += d[0].v + (d[1] ?? 0) 
            break;
        }
    }
}


function toString(description) {
    const arr = []
    for(const d of description) {
        arr.push(...Array.from({length: Number.isInteger(d) ? d : d.v}, ()=>Number.isInteger(d) ? "." : d.i))
    }
    return arr
}

const res = toString(description).reduce((p, c, i)=>{
    if(c===".") return p 
    return p+c*i
}, 0)

console.log("part2", res)

