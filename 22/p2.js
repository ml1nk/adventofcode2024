const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const initialSecrets = data.split("\n").map(e=>BigInt(e))

let resmap

for(let initialSecret of initialSecrets) {
    const variant = new Map()

    let sequence = [initialSecret]
    for(let i=0; i<2000;i++) {
        initialSecret = calcNext(initialSecret)
        sequence.push(initialSecret)

        if(sequence.length<5) continue


        const d1 = sequence[1]%10n-sequence[0]%10n
        const d2 = sequence[2]%10n-sequence[1]%10n
        const d3 = sequence[3]%10n-sequence[2]%10n
        const d4 = sequence[4]%10n-sequence[3]%10n
        key = `${d1},${d2},${d3},${d4}`

        const d = variant.get(key)
        if(d===undefined) variant.set(key, sequence[4]%10n)

        sequence.shift()
    }


    if(resmap === undefined) resmap = variant
    else {
        for(const [key, value] of variant.entries()) {
            let v = resmap.get(key)
            if(v === undefined) resmap.set(key, value)
            else resmap.set(key, value+v)
        }
    }
}

const res = [...resmap.entries()].reduce((p,e)=>e[1]>p[1]?e:p,["", 0])

console.log("part2", res[0], res[1])





function calcNext(secret) {
    secret = (secret^(secret*64n))%16777216n
    secret = (secret^(secret/32n))%16777216n
    return (secret^(secret*2048n))%16777216n
}


