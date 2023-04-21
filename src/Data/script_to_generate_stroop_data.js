function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const arr = ["Rouge", "Vert", "Jaune", "Bleu"]
const a = ["Rouge", "Vert", "Jaune", "Bleu"]

const answer = []


for (let i = 0; i < 25; i++) {
    let index1 = null
    let index2 = null

    while(index1 === index2) {
        index1 = randomIntFromInterval(0, 3);
        index2 = randomIntFromInterval(0, 3);
    }

    answer.push({
        "word": arr[index1],
        "color": a[index2]
    })
}

console.log(JSON.stringify(answer))