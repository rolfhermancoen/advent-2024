const  Day  = require("./Day");

class DayTwo extends Day {
  constructor() {
    super("02");
  }

  async partOne() {
    const data = await this.getData();
    const splitData = data.map((str) => str[0].split(" ")).map((array) => array.map((str) => parseInt(str)))

    let safe = 0;
    for (let i = 0; i < splitData.length; i++) {
        let dir = Math.sign(splitData[i][1] - splitData[i][0]);
        let prev = splitData[i][0]

        if(dir === 0) {
            continue;
        }
        
        for (let j = 1; j < splitData[i].length; j++) {
            const difference = Math.sign(splitData[i][j] - prev);

            if(difference === 0) {
                break;
            }

            if(difference !== dir) {
                break;
            } 

            if(dir === -1 && splitData[i][j] - prev < -3) {
                break;
            }

            if (dir === 1 && splitData[i][j] - prev > 3) {
                break;
            }
            prev = splitData[i][j]
            if(j === splitData[i].length - 1) {
                safe++
            }
        }
    }

    return safe
  };

  validate(numbers) {
    let dir = Math.sign(numbers[1] - numbers[0]);
    let prev = numbers[0]

    if(dir === 0) {
        return 0
    }
    
    for (let j = 1; j < numbers.length; j++) {
        const difference = Math.sign(numbers[j] - prev);

        if(difference === 0) {
            return j 
        }

        if(difference !== dir) {
            return j 
        } 

        if(dir === -1 && numbers[j] - prev < -3) {
            return j 
        }

        if (dir === 1 && numbers[j] - prev > 3) {
            return j 
        }
        prev = numbers[j]
        if(j === numbers.length - 1) {
            return true
        }
    }
  }

  async partTwo() {
    const data = await this.getData();
    const splitData = data.map((str) => str[0].split(" ")).map((array) => array.map((str) => parseInt(str)))

    let safe = 0;
    for (let i = 0; i < splitData.length; i++) {
        const firstValid = this.validate(splitData[i])

        if(firstValid === true) {
            safe++
            continue;
        }

        const removeIndexedArray = splitData[i].filter((_, index) => index !== firstValid)
        const secondValid = this.validate(removeIndexedArray)

        if(secondValid === true) {
            safe++
            continue;
        }

        if(firstValid === 0) {
            continue;
        }

        const removePreviousIndexedArray = splitData[i].filter((_, index) => index !== (firstValid - 1))
        const thirdValid = this.validate(removePreviousIndexedArray)

        if(thirdValid === true) {
            safe++
            continue;
        }

        const removeNextIndexedArray = splitData[i].filter((_, index) => index !== (firstValid + 1))
        const fourthValid = this.validate(removeNextIndexedArray)

        if(fourthValid === true) {
            safe++
            continue;
        }

        const removeFirstInArray = splitData[i].filter((_, index) => index !== 0)
        const fifthValid = this.validate(removeFirstInArray)

        if(fifthValid === true) {
            safe++
            continue;
        }
    }

    return safe
  };
}

const dayTwo = new DayTwo();