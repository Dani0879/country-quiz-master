import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../contexts/QuizContext'

const Home = () => {
  const navigate = useNavigate()
  const { resetQuiz } = useQuiz()

  const handleStartQuiz = () => {
    resetQuiz()
    navigate('/quiz')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg p-4 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-md text-center">
        {/* Welcome icon */}
        <div className="mb-8">
          <div className="text-9xl animate-pulse">🌍</div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Country Quiz
        </h1>

        {/* Description */}
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Test your knowledge about world countries and their flags. Can you identify all 10 countries?
        </p>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Features:</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>⏱️ 15 seconds per question</li>
            <li>🏆 Track your high score</li>
            <li>🌙 Dark mode support</li>
            <li>🎵 Audio feedback</li>
          </ul>
        </div>

        {/* Start button */}
        <button
          onClick={handleStartQuiz}
          className="w-full btn-primary text-lg py-4 mb-4 font-semibold"
        >
          Start Quiz
        </button>

        {/* Info text */}
        <p className="text-sm text-white/70">
          10 questions • 15 seconds each
        </p>
      </div>
    </div>
  )
}

export default Home
