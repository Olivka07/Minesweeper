import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/GameContext";

export default function Timer() {
    const [timer, setTimer] = useState(0)
    const [timerId, setTimerId] = useState(null)

    const {state, field} = useGame()

    const srcs = useMemo(() => {
        let timerS = ""
        if (timer < 10) {
            timerS = "00" + timer
        } else if (timer < 100) {
            timerS = "0" + timer
        } else if (timer > 999) {
            timerS = "999"
        } else {
            timerS = "" + timer
        }
        return {
            src1: "/assets/" + timerS[0] + ".jpg",
            src2: "/assets/" + timerS[1] + ".jpg",
            src3: "/assets/" + timerS[2] + ".jpg"
        }

    }, [timer])

    useEffect(() => {
        switch(state) {
            case 1: {
                setTimer(0)
                setTimerId(setInterval(() => {
                    setTimer(prev => prev+1)
                }, 1000))
                break;
            }
            case 0: {
                clearInterval(timerId)
                setTimer(0)
            }
            default: {
                clearInterval(timerId)
                break;
            }
        }
    }, [state])

    return (
        <div className="counter">
            <img alt="timer1" src={srcs.src1}/>
            <img alt="timer2" src={srcs.src2}/>
            <img alt="timer3" src={srcs.src3}/>
        </div>
    )
}