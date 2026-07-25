import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getRandomWord } from "./utils"

import { Header } from "./components/Header"
import { ConfettiContainer } from "./components/ConfettiContainer"
import { GameStatus } from "./components/GameStatus"
import { LanguageChips } from "./components/Languagechips"

/**
 * Backlog:
 * 
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * ✅ Choose a random word from a list of words
 * ✅ Make the New Game button reset the game
 * ✅ Reveal what the word was if the user loses the game
 * ✅ Confetti drop when the user wins
 * 
 * Challenge: 🎊🎊🎊🎊🎊
 */

export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    // Derived values
    const numGuessesLeft: number = languages.length - 1
    const wrongGuessCount: number =
        guessedLetters.filter((letter:string) => !currentWord.includes(letter)).length
    const isGameWon: boolean =
        currentWord.split("").every((letter:string) => guessedLetters.includes(letter))
    const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
    const isGameOver: boolean = isGameWon || isGameLost
    const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect: string | boolean = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter:string): void {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame():void {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

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
        <main>
            <ConfettiContainer isGameWon={isGameWon} />
            <Header />

            <GameStatus
              isGameOver={isGameOver}
              isLastGuessIncorrect={isLastGuessIncorrect}
              isGameWon={isGameWon}
              isGameLost={isGameLost}
              wrongGuessCount={wrongGuessCount}
            />
            
            <LanguageChips languageEle={languageElements} />

            <section className="word">
                {letterElements}
            </section>

            {/* Combined visually-hidden aria-live region for status updates */}
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

            <section className="keyboard">
                {keyboardElements}
            </section>

            {isGameOver &&
                <button
                    className="new-game"
                    onClick={startNewGame}
                >New Game</button>}
        </main>
    )
}
