import { createContext, useContext, useState, useEffect } from 'react'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answered, setAnswered] = useState(false)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('countryQuizHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }

    const savedDarkMode = localStorage.getItem('countryQuizDarkMode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Update localStorage when high score changes
  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem('countryQuizHighScore', highScore.toString())
    }
  }, [highScore])

  // Update localStorage when dark mode changes
  useEffect(() => {
    localStorage.setItem('countryQuizDarkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const resetQuiz = () => {
    setCurrentScore(0)
    setCurrentQuestionIndex(0)
    setAnswered(false)
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1)
    setAnswered(false)
  }

  const addScore = () => {
    const newScore = currentScore + 1
    setCurrentScore(newScore)
    if (newScore > highScore) {
      setHighScore(newScore)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <QuizContext.Provider
      value={{
        currentScore,
        highScore,
        darkMode,
        toggleDarkMode,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        addScore,
        resetQuiz,
        nextQuestion,
        answered,
        setAnswered,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider')
  }
  return context
}
