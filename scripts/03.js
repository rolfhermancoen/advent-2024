const  Day  = require("./Day");

const regexp = /mul\(\d{1,3},\d{1,3}\)/g
const expandedRegexp = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g


class DayThree extends Day {
  constructor() {
    super("03", "false");
  }

  async partOne() {
    const data = await this.getData();
    const str = data.reduce((prev, cur) => `${prev}${cur}`, "")

    const matched = [...str.matchAll(regexp)].map((val) => val[0])

    const multiplied = matched.map((mul) => {
        const clean = mul.replace("mul", "").replace("(", "").replace(")", "")
        const [left, right] = clean.split(",")
        return left * right
    })

    return multiplied.reduce((prev, cur) => prev + cur,0)
  }

  async partTwo() {
    const data = await this.getData();
    const str = data.reduce((prev, cur) => `${prev}${cur}`, "")

    const matched = [...str.matchAll(expandedRegexp)].map((val) => val[0])

    let active = true
    const multiplied = matched.map((match) => {
        if(match.includes("don't()")) {
            active = false
            return 0
        }
        if(match.includes("do()")) {
            active = true
            return 0
        }
        if(match.includes("mul") && active) {
            const clean = match.replace("mul", "").replace("(", "").replace(")", "")
            const [left, right] = clean.split(",")
            return left * right
        }
        return 0
      
    })

    return multiplied.reduce((prev, cur) => prev + cur,0)
  };
}

const dayThree = new DayThree();