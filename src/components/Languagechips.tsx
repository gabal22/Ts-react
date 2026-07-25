
interface ElementsProps {
  languageEle: React.JSX.Element[];
}

export const LanguageChips = ({languageEle}: ElementsProps) => {
  return (
    <section className="language-chips">
        {languageEle}
    </section>
  )
}
