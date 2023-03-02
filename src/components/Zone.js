import { useEffect, useMemo, useRef, useState } from "react"
import { useGame } from "../context/GameContext"

export default function Zone({i, j}) {


    const btn = useRef(null)
    const img = useRef(null)

    const {startGame, stepGame ,state, field, fieldUser, incBomb, decBomb, headerImage, loseGame} = useGame()



    function mouseDown(e) {
        
        if (e.button === 0 && img.current.src.indexOf('/assets/cell.jpg') !== -1) {
            headerImage.current.src = '/assets/fear.jpg'
            return
        }
        if (img.current.src.indexOf('/assets/question.jpg') !== -1) {
            img.current.src = '/assets/questionhold.jpg'
            return
        }
    }

    function mouseUp(e) {
        // if (e.button === 0 && field.length > 0 && field[i][j] === -1) {
        //     headerImage.current.src = '/assets/lose.jpg'
        //     return
        // }
        if (e.button === 0) {
            headerImage.current.src = '/assets/smile.jpg'
            return
        }
    }


    useEffect(() => {
        img.current.src = '/assets/cell.jpg'
        btn.current.addEventListener('mousedown', e => mouseDown(e))
        btn.current.addEventListener('mouseup', e => mouseUp(e))

        return () => {
            btn.current.removeEventListener('mousedown', e => mouseDown(e))
            btn.current.removeEventListener('mouseup', e => mouseUp(e))
        }
        
    }, [field])

    useEffect(() => {
        if (fieldUser.length!==0) {
            if (field[i][j] === -1 && fieldUser[i][j] === true) {
                img.current.src = '/assets/pressbomb.jpg'
            } else if(field[i][j] === -1 && state === -1) {
                img.current.src = '/assets/bombnotpress.jpg'
            } else if (field[i][j] === 0 && fieldUser[i][j] === true) {
                img.current.src = '/assets/voidcell.jpg'
            } else if (fieldUser[i][j] === true) {
                img.current.src = `/assets/${field[i][j]}cell.jpg`
            }
        } else {
            img.current.src = '/assets/cell.jpg'
        }
    }, [fieldUser])

    function leftClickZone() {
        if (state !== 1) {
            startGame(i, j)
        } else {
            stepGame(i,j)
        }
    }

    function rightClickZone(e) {
        if (state!==-1) {
            e.preventDefault()
            if (img.current.src.indexOf('/assets/cell.jpg') !== -1) {
                decBomb()
                img.current.src = '/assets/flag.jpg'
                return
            }
            if (img.current.src.indexOf('/assets/flag.jpg') !== -1) {
                img.current.src = '/assets/question.jpg'
                return
            }
            if (img.current.src.indexOf('/assets/questionhold.jpg') !== -1) {
                incBomb()
                img.current.src = '/assets/cell.jpg'
                return
            }
        }
        
    }

    return (
        <button 
            disabled={((fieldUser.length!==0 && fieldUser[i][j]=== true) || (state===2 || state === -1)) ? true : false} 
            onClick={e => leftClickZone(e)} 
            onContextMenu={e => rightClickZone(e)}
            className='zone'
            ref={btn}
        >
            {/* <img ref={img} src={srcImg} /> */}
            <img ref={img} />
        </button>
    )
}