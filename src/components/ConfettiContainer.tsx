import Confetti from "react-confetti"

export const ConfettiContainer = ({isGameWon}: {isGameWon: boolean}) => {
  return (
    <>
        {
            isGameWon && 
                <Confetti
                    recycle={false}
                    numberOfPieces={1000}
                />
        }
    </>
  )
}
