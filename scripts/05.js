const  Day  = require("./Day");


class DayFive extends Day {
  constructor() {
    super("05");
  }

  async partOne() {
    const data = await this.getData();

    const splitIndex = data.findIndex((val) => val[0] === "")
    const rules = data.toSpliced(splitIndex).map((array) => array.map((val) => parseInt(val)))
    const updates = data.toSpliced(0, splitIndex + 1).map((array) => array[0].split(",")).map((array) => array.map((val) => parseInt(val)))

    const validUpdates = []
    for (let i = 0; i < updates.length; i++) {
        const update = updates[i]
        let valid = true
        for(let j = 0; j < update.length; j++) {
            const page = update[j]
            const updateRules = rules.filter((rule) => rule[0] === page || rule[1] === page)

            const before = update.toSpliced(j)
            const after = update.toSpliced(0, j + 1)

            const isBeforeRules = updateRules.filter((rule) => rule[0] === page)
            const isAfterRules = updateRules.filter((rule) => rule[1] === page)

            for (const beforeNumber of before) {
                const isValid = !isBeforeRules.some((rule) => rule[1] === beforeNumber)
                if(!isValid) {
                    valid = isValid
                    break;
                }
            }

            for (const afterNumber of after) {
                const isValid = !isAfterRules.some((rule) => rule[1] === afterNumber)
                if(!isValid) {
                    valid = isValid
                    break;
                }
            }
        }

        if(valid) {
            validUpdates.push(update)
        }
    }
  
    return validUpdates.map((array) => array[Math.floor(array.length / 2)]).reduce((prev, cur) => prev + cur,0)
  }

  async partTwo() {
    return 0
  };


}

const dayFive = new DayFive();