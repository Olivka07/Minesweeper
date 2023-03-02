import { useMemo } from "react";
import { useGame } from "../context/GameContext";

export default function CounterBomb() {
    const {state, countBomb} = useGame()

    const srcs = useMemo(() => {
        let countS = ""
        if (countBomb < 10) {
            countS = "00" + countBomb
        } else if (countBomb < 100) {
            countS = "0" + countBomb
        } else if (countBomb > 999) {
            countS = "999"
        } else {
            countS = "" + countBomb
        }
        return {
            src1: "/assets/" + countS[0] + ".jpg",
            src2: "/assets/" + countS[1] + ".jpg",
            src3: "/assets/" + countS[2] + ".jpg"
        }

    }, [countBomb])


    return (
        <div className="counter">
            <img alt="count1" src={srcs.src1}/>
            <img alt="count2" src={srcs.src2}/>
            <img alt="count3" src={srcs.src3}/>
        </div>
    )
}