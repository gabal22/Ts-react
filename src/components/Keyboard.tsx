import { clsx } from "clsx"
import type { GameState } from "../App"

interface KeyboardProps extends GameState {
    alphabet: string,
    addGuessedLetter: (letter:string) => void,
    isGameOver: boolean,
}


export const Keyboard = ({alphabet, currentWord, guessedLetters, addGuessedLetter,  isGameOver}: KeyboardProps) => {

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

  return (
    <section className="keyboard">
        {keyboardElements}
    </section>
  )
}
