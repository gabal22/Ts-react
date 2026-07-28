import type { langTypes } from "../languages"
import clsx from "clsx"


interface LangChipsProps {
  languages: langTypes[],
  wrongGuessCount: number

}

export const LanguageChips = ({languages, wrongGuessCount}: LangChipsProps) => {

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

  return (
    <section className="language-chips">
        {languageElements}
    </section>
  )
}
