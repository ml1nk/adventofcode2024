const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const description = data.split("").map(e => parseInt(e))


let id = 0
let isFreeSpace = false
const arr = []

for(const d of description) {
    arr.push(...Array.from({length: d}, ()=>isFreeSpace ? "." : id))

    if(isFreeSpace) isFreeSpace = false
    else {
        isFreeSpace = true
        id++
    }
}

let freeIndex = arr.findIndex((e)=>e===".")
let blockedIndex = arr.findLastIndex((e)=>e!==".")


while(freeIndex > -1 && blockedIndex > -1 && freeIndex < blockedIndex) {

    arr[freeIndex] = arr[blockedIndex]
    arr[blockedIndex] = "."

    freeIndex = arr.findIndex((e)=>e===".", freeIndex)
    blockedIndex = arr.findLastIndex((e)=>e!==".", blockedIndex)
}


const res = arr.reduce((p, c, i)=>{
    if(c===".") return p 
    return p+c*i
}, 0)

console.log("part1", res)