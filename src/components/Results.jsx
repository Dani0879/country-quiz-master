import { useQuiz } from '../contexts/QuizContext'

const Results = ({ onPlayAgain }) => {
  const { currentScore, highScore, resetQuiz } = useQuiz()

  const handlePlayAgain = () => {
    resetQuiz()
    onPlayAgain()
  }

  const percentage = Math.round((currentScore / 10) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg p-4 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md text-center">
        {/* Celebration animation */}
        <div className="mb-8">
          <div className="text-9xl animate-bounce">🎉</div>
        </div>

        {/* Results text */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Congrats! You completed the quiz.
        </h1>

        <p className="text-2xl text-white font-semibold mb-8">
          You answer {currentScore}/10 correctly
        </p>

        {/* Score bar */}
        <div className="bg-white/10 rounded-lg p-4 mb-8">
          <div className="text-lg text-gray-300 mb-2">Score: {percentage}%</div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* High Score */}
        {currentScore === highScore && (
          <div className="bg-primary/20 border border-primary rounded-lg p-4 mb-6">
            <p className="text-primary font-bold text-lg">🏆 New High Score: {highScore}</p>
          </div>
        )}

        {currentScore > 0 && currentScore < highScore && (
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm">High Score: <span className="text-primary font-bold">{highScore}</span></p>
          </div>
        )}

        {/* Play again button */}
        <button
          onClick={handlePlayAgain}
          className="w-full btn-primary mb-4 text-lg py-4"
        >
          Play again
        </button>

        {/* Home button */}
        <button
          onClick={() => window.location.href = '/'}
          className="w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Results
