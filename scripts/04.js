const  Day  = require("./Day");

class DayFour extends Day {
  constructor() {
    super("04");
  }

  async partOne() {
    const data = await this.getData();
    const gridData = data.map((dat) => dat[0].split(""));
    
    let amount = 0;
    for(let y = 0; y < gridData.length; y++) {
        for (let x = 0; x < gridData[0].length; x++) {
            const xLetter = gridData[y][x]
     
            if(xLetter !== "X") {
                continue;
            }
            const xPos = {x, y}

            const mPositions = []
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if(gridData[y + i]?.[x + j] === "M") {
                        mPositions.push({x: j + x, y: i + y})
                    }
                }
            }

            const aPositions = []

            for(let m = 0; m < mPositions.length; m++) {
                const mPos = mPositions[m]
                const aX = mPos.x + (xPos.x > mPos.x ? -Math.abs(xPos.x - mPos.x) : Math.abs(xPos.x - mPos.x))
                const aY = mPos.y + (xPos.y > mPos.y ? -Math.abs(xPos.y - mPos.y) : Math.abs(xPos.y - mPos.y))
                if(gridData[aY]?.[aX] === "A") {
                    aPositions.push({x: aX, y: aY, mPos})
                } else {
                    mPositions[m].valid = false
                }
            }
           
            for(let a = 0; a < aPositions.length; a++) {
                const aPos = aPositions[a]
                const mPos = aPos.mPos
                const sX = aPos.x + (mPos.x > aPos.x ? -Math.abs(mPos.x - aPos.x) : Math.abs(mPos.x - aPos.x))
                const sY = aPos.y + (mPos.y > aPos.y ? -Math.abs(mPos.y - aPos.y) : Math.abs(mPos.y - aPos.y))
                if(gridData[sY]?.[sX] === "S") {
                    amount++
                }
            }
        }
    }


    return amount
  }

  async partTwo() {
    return 0
  };


}

const dayFour = new DayFour();