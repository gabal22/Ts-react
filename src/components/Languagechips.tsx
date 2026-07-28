
interface ElementsProps {
  languageEle: React.ReactNode;
}

export const LanguageChips = ({languageEle}: ElementsProps) => {
  return (
    <section className="language-chips">
        {languageEle}
    </section>
  )
}
