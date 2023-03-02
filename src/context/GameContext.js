import { createContext, useContext, useRef, useState } from "react";

function noop() {}

const GameContext = createContext({
    state: null,
    countBomb: null,
    sizeX: null,
    sizeY: null,
    field: null,
    fieldUser: null,
    headerImage: null,
    startGame: noop,
    stopGamePause: noop,
    stepGame: noop,
    restartGame: noop,
    incBomb: noop,
    decBomb: noop
})

export const useGame = function() {
    return useContext(GameContext)
}

export default function GameProvider({children}) {

    const [sizeX, setSizeX] = useState(16)
    const [sizeY, setSizeY] = useState(16)
    const [bombs, setBombs] = useState(40)

    const [field, setField] = useState([])

    const [fieldUser, setFieldUser] = useState([])

    const [countBomb, setCountBomb] = useState(40)

    const [state, setState] = useState(0)

    const headerImage = useRef(null)


    const restartGame = () => {
        setCountBomb(40)
        setFieldUser([])
        setField([])
        setState(0)
        headerImage.current.src = '/assets/smile.jpg'
    }

    const incBomb = () => {
        setCountBomb(prev => prev + 1)
    }

    const decBomb = () => {
        setCountBomb(prev => prev - 1)
    }

    const startGame = (i, j) => {
        const startField = createBombOnField(i,j)
        createNumbersOnField(startField)

        const userField = Array(sizeY).fill('').map(el => Array(sizeX).fill(false))

        if (startField[i][j] === 0) {
            openWithZeroArea(i, j, userField, startField)
        }  else {
            userField[i][j] = true
        }

        setFieldUser(userField)
        setField(startField) 
        setState(1)
    }

    function stepGame(i, j) {
        const userField = fieldUser.slice(0)
        if (field[i][j] === 0) {
            openWithZeroArea(i, j, userField)
        }  else if (field[i][j] === -1) {
            userField[i][j] = true
            setState(-1)
        } else {
            userField[i][j] = true
            let count = 0
            for (let row = 0; row<sizeY; row++) {
                for (let column = 0; column < sizeX; column++) {
                    if (userField[row][column] === false) {
                        count++
                    }
                }
            }
            if (count === bombs) {
                setState(2)
            }
        }

        setFieldUser(userField)
    }

    const openWithZeroArea = (i, j, userField = null, startField = null) => {
        if (startField) {
            userField[i][j] = true
            // идет вверх над клеткой
            if (i-1>=0) {
                let indexRow = i-1;
                if (userField[indexRow][j] !== true && startField[indexRow][j] === 0) {
                    openWithZeroArea(indexRow, j, userField, startField)
                } else {
                    userField[indexRow][j] = true
                }
            }
            
            
                
            
            // идет вверх и влево над клеткой
            if (i-1>=0 && j-1>=0) {
                
                let indexRow = i-1;
                let indexColumn = j-1;
                
                if (userField[indexRow][indexColumn] !== true && startField[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField, startField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
            
            
                    
            // идет вверх и вправо над клеткой
            if (i-1>=0 && j+1<sizeX) {

                let indexRow = i-1;
                let indexColumn = j+1;
                if (userField[indexRow][indexColumn] !== true && startField[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField, startField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
                
            
            // идет влево от клетки
            if (j-1>=0) {
                
                let indexColumn = j-1;
                if (userField[i][indexColumn] !== true && startField[i][indexColumn] === 0) {
                    openWithZeroArea(i, indexColumn, userField, startField)
                } else {
                    userField[i][indexColumn] = true
                }
            }
                
            
            // идет вправо от клетки
            if (j+1<sizeX) {

                let indexColumn = j+1;
                if (userField[i][indexColumn] !== true && startField[i][indexColumn] === 0) {
                    openWithZeroArea(i, indexColumn, userField, startField)
                } else {
                    userField[i][indexColumn] = true
                }
            }
            
            
            // идет вниз под клеткой
            if (i+1<sizeY) {
                let indexRow = i+1;
                
                if (userField[indexRow][j] !== true && startField[indexRow][j] === 0) {
                    openWithZeroArea(indexRow, j, userField, startField)
                } else {
                    userField[indexRow][j] = true
                }
            }
            
                
            // идет вниз и влево под клеткой
            if (i+1<sizeY && j-1>=0) {

                let indexRow = i+1;
                let indexColumn = j-1;
                
                if (userField[indexRow][indexColumn] !== true && startField[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField, startField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
                    
            
            // идет вниз и вправо под клеткой
            if (i+1<sizeY && j+1<sizeX) {

                let indexRow = i+1;
                let indexColumn = j+1;
                
                if (userField[indexRow][indexColumn] !== true && startField[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField, startField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
        } else {
            userField[i][j] = true
            // идет вверх над клеткой
            if (i-1>=0) {
                let indexRow = i-1;
                if (userField[indexRow][j] !== true && field[indexRow][j] === 0) {
                    openWithZeroArea(indexRow, j, userField)
                } else {
                    userField[indexRow][j] = true
                }
            }
            
            
                
            
            // идет вверх и влево над клеткой
            if (i-1>=0 && j-1>=0) {
                
                let indexRow = i-1;
                let indexColumn = j-1;
                
                if (userField[indexRow][indexColumn] !== true && field[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
            
            
                    
            // идет вверх и вправо над клеткой
            if (i-1>=0 && j+1<sizeX) {

                let indexRow = i-1;
                let indexColumn = j+1;
                if (userField[indexRow][indexColumn] !== true && field[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
                
            
            // идет влево от клетки
            if (j-1>=0) {
                
                let indexColumn = j-1;
                if (userField[i][indexColumn] !== true && field[i][indexColumn] === 0) {
                    openWithZeroArea(i, indexColumn, userField)
                } else {
                    userField[i][indexColumn] = true
                }
            }
                
            
            // идет вправо от клетки
            if (j+1<sizeX) {

                let indexColumn = j+1;
                if (userField[i][indexColumn] !== true && field[i][indexColumn] === 0) {
                    openWithZeroArea(i, indexColumn, userField)
                } else {
                    userField[i][indexColumn] = true
                }
            }
            
            
            // идет вниз под клеткой
            if (i+1<sizeY) {
                let indexRow = i+1;
                
                if (userField[indexRow][j] !== true && field[indexRow][j] === 0) {
                    openWithZeroArea(indexRow, j, userField)
                } else {
                    userField[indexRow][j] = true
                }
            }
            
                
            // идет вниз и влево под клеткой
            if (i+1<sizeY && j-1>=0) {

                let indexRow = i+1;
                let indexColumn = j-1;
                
                if (userField[indexRow][indexColumn] !== true && field[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
                    
            
            // идет вниз и вправо под клеткой
            if (i+1<sizeY && j+1<sizeX) {

                let indexRow = i+1;
                let indexColumn = j+1;
                
                if (userField[indexRow][indexColumn] !== true && field[indexRow][indexColumn] === 0) {
                    openWithZeroArea(indexRow, indexColumn, userField)
                } else {
                    userField[indexRow][indexColumn] = true
                }
            }
        }
    }

    const createBombOnField = (i, j) => {
        const startField = Array(sizeY).fill('').map(el => Array(sizeX).fill(0))
        let numberBomb = 0
        
        while (numberBomb < countBomb) {
            let row  = Math.trunc(Math.random() * 16)
            let column = Math.trunc(Math.random() * 16)

            if (row !== i && column !== j && startField[row][column] !== -1) {
                startField[row][column] = -1
                numberBomb++
            }
        }

        return startField
    }

    const createNumbersOnField = (startField) => {
        for (let i = 0; i<sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                if (startField[i][j] !== -1) {
                    computeNumberForCell(i, j, startField)
                }

            }
        }
    }

    const computeNumberForCell = (row, column, startField) => {
        let number = 0

        // идет вверх над клеткой
		if (row-1>=0) {
			let indexRow = row-1;
			if (startField[indexRow][column] === -1) {
                number++
            }
		}
		
		
			
		
		// идет вверх и влево над клеткой
		if (row-1>=0 && column-1>=0) {
			
			let indexRow = row-1;
			let indexColumn = column-1;
			
            if (startField[indexRow][indexColumn] === -1) {
                number++
            }
		}
		
		
				
		// идет вверх и вправо над клеткой
		if (row-1>=0 && column+1<sizeX) {

			let indexRow = row-1;
			let indexColumn = column+1;
			if (startField[indexRow][indexColumn] === -1) {
                number++
            }
		}
			
		
		// идет влево от клетки
		if (column-1>=0) {
			
			let indexColumn = column-1;
			if (startField[row][indexColumn] === -1) {
                number++
            }
		}
			
		
		// идет вправо от клетки
		if (column+1<sizeX) {

			let indexColumn = column+1;
			if (startField[row][indexColumn] === -1) {
                number++
            }
		}
		
		
		// идет вниз под клеткой
		if (row+1<sizeY) {
			let indexRow = row+1;
			
            if (startField[indexRow][column] === -1) {
                number++
            }
		}
		
			
		// идет вниз и влево под клеткой
		if (row+1<sizeY && column-1>=0) {

			let indexRow = row+1;
			let indexColumn = column-1;
			
            if (startField[indexRow][indexColumn] === -1) {
                number++
            }
		}
				
		
		// идет вниз и вправо под клеткой
		if (row+1<sizeY && column+1<sizeX) {

			let indexRow = row+1;
			let indexColumn = column+1;
			
            if (startField[indexRow][indexColumn] === -1) {
                number++
            }
		}
        
        startField[row][column] = number
    }

    const stopGamePause = () => {
        setState(0)
    }


    return (
        <GameContext.Provider 
            value={{
                state, countBomb,
                sizeX, sizeY,
                field, fieldUser,
                headerImage,
                startGame,
                stopGamePause,
                stepGame, restartGame,
                incBomb, decBomb,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}