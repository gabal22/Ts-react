import { useState } from "react"
import { languages } from "./languages"
import { getRandomWord } from "./utils"

import { Header } from "./components/Header"
import { ConfettiContainer } from "./components/ConfettiContainer"
import { GameStatus } from "./components/GameStatus"
import { LanguageChips } from "./components/Languagechips"
import { AriaStatus } from "./components/AriaStatus"
import { WordLetters } from "./components/WordLetters"
import { Keyboard } from "./components/Keyboard"
import { GameButton } from "./components/GameButton"


export interface GameState {
    currentWord: string,
    guessedLetters: string[]
}

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
            
            <LanguageChips
                languages={languages}
                wrongGuessCount={wrongGuessCount}
            />

            <WordLetters 
                currentWord={currentWord}
                isGameLost={isGameLost}
                guessedLetters={guessedLetters}
            />

            {/* Combined visually-hidden aria-live region for status updates */}
            <AriaStatus
                currentWord={currentWord}
                lastGuessedLetter={lastGuessedLetter}
                numGuessesLeft={numGuessesLeft}
                guessedLetters={guessedLetters}
            />


            <Keyboard
                alphabet={alphabet}
                guessedLetters={guessedLetters}
                currentWord={currentWord}
                addGuessedLetter={addGuessedLetter}
                isGameOver={isGameOver}
            />


            {isGameOver &&
                <GameButton 
                    typeBtn="new-game"
                    content="New Game"
                    strarNew={startNewGame}
                />
            }
        </main>
    )
}
