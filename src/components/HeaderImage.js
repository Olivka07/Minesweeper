import { useEffect } from "react"
import { useGame } from "../context/GameContext"

export default function HeaderImage() {

    const {restartGame, headerImage, state} = useGame()

    useEffect(() => {
        headerImage.current.src = "/assets/smile.jpg"
    }, [])

    useEffect(() => {
        switch (state) {
            case 2: {
                headerImage.current.src = "/assets/win.jpg"
                break;
            }
            case -1: {
                headerImage.current.src = "/assets/lose.jpg"
                break;
            }

                
        }
    }, [state])

    return (
        <button
            className="header-image"
            onClick={e => restartGame()}
        >
            <img ref={headerImage} />
        </button>
    )
}