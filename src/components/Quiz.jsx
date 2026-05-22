import { useState, useEffect, useCallback } from 'react'
import { useQuiz } from '../contexts/QuizContext'
import { playSuccessSound, playErrorSound } from '../utils/audio'
import { quizData, getShuffledOptions } from '../data/quizData'

const Quiz = ({ onQuizComplete }) => {
  const {
    currentScore,
    currentQuestionIndex,
    addScore,
    nextQuestion,
    answered,
    setAnswered,
  } = useQuiz()

  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [shuffledOptions, setShuffledOptions] = useState([])

  const question = quizData[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizData.length - 1

  // Initialize shuffled options
  useEffect(() => {
    setShuffledOptions(getShuffledOptions(question))
    setSelectedAnswer(null)
    setTimeLeft(15)
  }, [currentQuestionIndex, question])

  // Define handleNext before using it
  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      onQuizComplete()
    } else {
      nextQuestion()
    }
  }, [isLastQuestion, onQuizComplete, nextQuestion])

  const handleTimeoutAnswer = useCallback(() => {
    playErrorSound()
    setAnswered(true)
    handleNext()
  }, [handleNext, setAnswered])

  // Timer effect
  useEffect(() => {
    if (answered) return

    if (timeLeft === 0) {
      handleTimeoutAnswer()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, answered, handleTimeoutAnswer])

  const handleAnswerSelect = useCallback((option) => {
    if (answered) return

    setSelectedAnswer(option)
    setAnswered(true)

    if (option === question.correct) {
      playSuccessSound()
      addScore()
    } else {
      playErrorSound()
    }

    setTimeout(() => {
      handleNext()
    }, 1000)
  }, [answered, question.correct, addScore, handleNext, setAnswered])

  const getButtonStyle = (option) => {
    let baseStyle = 'btn-option'

    if (!answered) {
      if (option === selectedAnswer) {
        baseStyle += ' border-primary'
      }
    } else {
      if (option === question.correct) {
        baseStyle += ' correct'
      } else if (option === selectedAnswer) {
        baseStyle += ' incorrect'
      }
    }

    return baseStyle
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg p-4 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Country Quiz</h1>
          <div className="bg-primary text-white px-6 py-2 rounded-full font-semibold">
            🏆 {currentScore}/10 Points
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 dark:bg-dark-card backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-6">
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {quizData.map((_, idx) => (
              <button
                key={idx}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  idx < currentQuestionIndex
                    ? 'bg-green-500 text-white'
                    : idx === currentQuestionIndex
                    ? 'bg-primary text-white'
                    : 'bg-white/20 text-gray-400'
                }`}
                disabled
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Question */}
          <h2 className="text-xl md:text-2xl font-semibold text-white text-center mb-8">
            {question.question}
          </h2>

          {/* Flag and Timer */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="text-6xl">{question.flag}</div>
            <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-primary'}`}>
              {timeLeft}s
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {shuffledOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={answered}
                className={`${getButtonStyle(option)} ${answered ? 'cursor-default' : ''}`}
              >
                {option}
                {answered && option === question.correct && ' ✓'}
                {answered && option === selectedAnswer && option !== question.correct && ' ✗'}
              </button>
            ))}
          </div>

          {/* Status message */}
          {answered && (
            <div className={`text-center font-semibold text-lg ${
              selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'
            }`}>
              {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect!'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
