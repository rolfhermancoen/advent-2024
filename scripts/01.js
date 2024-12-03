const  Day  = require("./Day");

class DayOne extends Day {
  constructor() {
    super("01");
  }

  async partOne() {
    const data = await this.getData();
    const left = []
    const right = []

    for (const pair of data) {
        const [leftNumber, rightNumber] = pair.join("").split("   ")
        left.push(parseInt(leftNumber))
        right.push(parseInt(rightNumber))
    }

    const sortedLeft = left.toSorted((a, b) => a - b)
    const sortedRight = right.toSorted((a, b) => a - b)
    
    const distances = []
    for (let i = 0; i < sortedLeft.length; i++) {
        const distance = sortedLeft[i] - sortedRight[i]
        distances.push(Math.abs(distance))
    }

    return distances.reduce((prev, cur) => prev + cur, 0)
  };

  async partTwo() {
    const data = await this.getData();
    const left = []
    const right = []

    for (const pair of data) {
        const [leftNumber, rightNumber] = pair.join("").split("   ")
        left.push(parseInt(leftNumber))
        right.push(parseInt(rightNumber))
    }

    const score = []
    for (const number of left) {
        const foundNumbers = right.filter((val) => val === number)
        score.push(number * foundNumbers.length)
    }

    return score.reduce((prev, cur) => prev + cur,0)
  };
}

const dayOne = new DayOne();