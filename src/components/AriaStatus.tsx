import { type GameState } from "../App"


interface AriaStatusProps extends GameState {
    lastGuessedLetter: string,
    numGuessesLeft: number,
}

export const AriaStatus = ({currentWord, lastGuessedLetter, numGuessesLeft, guessedLetters}: AriaStatusProps) => {
  return (
    <section
        className="sr-only"
        aria-live="polite"
        role="status"
    >
        <p>
            {currentWord.includes(lastGuessedLetter) ?
                `Correct! The letter ${lastGuessedLetter} is in the word.` :
                `Sorry, the letter ${lastGuessedLetter} is not in the word.`
            }
            You have {numGuessesLeft} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter =>
            guessedLetters.includes(letter) ? letter + "." : "blank.")
            .join(" ")}</p>

    </section>
  )
}
