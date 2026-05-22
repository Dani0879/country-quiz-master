import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QuizProvider } from './contexts/QuizContext'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Header from './components/Header'

const AppContent = () => {
  const [showResults, setShowResults] = useState(false)

  const handleQuizComplete = () => {
    setShowResults(true)
  }

  const handlePlayAgain = () => {
    setShowResults(false)
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/quiz"
          element={
            showResults ? (
              <Results onPlayAgain={handlePlayAgain} />
            ) : (
              <Quiz onQuizComplete={handleQuizComplete} />
            )
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <QuizProvider>
        <AppContent />
      </QuizProvider>
    </Router>
  )
}

export default App
