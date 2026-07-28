
interface ButtonProps {
  typeBtn: "new-game" | "reset" | "submit",
  content: string,
  strarNew: () => void
}

export const GameButton = ({typeBtn, content, strarNew}: ButtonProps) => {
  return (
    <button
        className={typeBtn}
        onClick={strarNew}
    >
      {content}
    </button>
  )
}
