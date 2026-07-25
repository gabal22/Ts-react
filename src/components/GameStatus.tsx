import clsx from "clsx";
import { getFarewellText } from "../utils";
import { languages } from "../languages";

interface StatusProps {
    isGameOver: boolean;
    isLastGuessIncorrect: string | boolean;
    isGameWon: boolean;
    isGameLost: boolean;
    wrongGuessCount: number;
}

export const GameStatus = ({isGameOver, isLastGuessIncorrect, isGameWon, isGameLost, wrongGuessCount}: StatusProps) => {

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

  return (
    <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}
    >
        {renderGameStatus()}
    </section>
  )
}
