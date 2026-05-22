import { useQuiz } from '../contexts/QuizContext'

const Header = () => {
  const { darkMode, toggleDarkMode } = useQuiz()

  return (
    <header className="fixed top-0 right-0 p-4 z-50 flex gap-4">
      <button
        onClick={toggleDarkMode}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm"
        title="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header
