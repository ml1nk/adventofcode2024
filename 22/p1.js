const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const initialSecrets = data.split("\n").map(e=>BigInt(e))



let sum = 0n
for(let initialSecret of initialSecrets) {
    for(let i=0; i<2000;i++) {
        initialSecret = calcNext(initialSecret)
    }
    sum += initialSecret
}

console.log("part1", sum)


function calcNext(secret) {
    secret = (secret^(secret*64n))%16777216n
    secret = (secret^(secret/32n))%16777216n
    return (secret^(secret*2048n))%16777216n
}


