import clsx from "clsx"
import type { GameState } from "../App"

interface WordLettersProps extends GameState {
    isGameLost: boolean,

}

export const WordLetters = ({ currentWord, isGameLost, guessedLetters }: WordLettersProps) => {

    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

  return (
    <section className="word">
        {letterElements}
    </section>
  )
}
