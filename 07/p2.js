const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const equations = data.split("\n").map(e => e.split(": ").map((e, i) => {
    if (i === 0) return parseInt(e)
    return e.split(" ").reverse().join("+");
}))

const operators = ["+", "*", "|"]

let res = 0

for (const equation of equations) {
    outer:
    while (true) {
        // eval(equation[1]) does not work => precedence of *
        // console.log(equation[0], equation[1], customEval(equation[1]))
        if (equation[0] === customEval(equation[1])) {
            res += equation[0]
            break;
        }

        let index = 0;
        let nextOperator


        do {
            index = findIndex(equation[1],index+1)
            if(index === -1) break outer;
            nextOperator = (operators.findIndex(e=>e===equation[1][index]) + 1)
            equation[1] = replace(equation[1], index, operators[nextOperator % operators.length])
        } while(nextOperator === operators.length)
    }

}

console.log("part2", res)

function replace(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

function findIndex(str, index) {
    for (let i = index; i < str.length; i++) {
        if (operators.includes(str[i])) {
            return i
        }
    }
    return -1
} 

function customEval(str) {
    const index = findIndex(str, 0)
    if(index === -1) return parseInt(str) 

    const number = parseInt(str.slice(0, index))

    switch(str[index]) {
        case "+":
            return number + customEval(str.slice(index+1))
        case "*":
            return number * customEval(str.slice(index+1))
        case "|":
            return parseInt(
                customEval(str.slice(index+1)).toString() +
                number.toString()
            )
        default:
            throw "error"
    }
}