import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuizProvider, useQuiz } from '../contexts/QuizContext'

// Test component to access context
function TestComponent() {
  const context = useQuiz()
  return (
    <div>
      <div data-testid="current-score">{context.currentScore}</div>
      <div data-testid="high-score">{context.highScore}</div>
      <div data-testid="dark-mode">{context.darkMode ? 'dark' : 'light'}</div>
      <button onClick={() => context.addScore()}>Add Score</button>
      <button onClick={() => context.toggleDarkMode()}>Toggle Dark Mode</button>
      <button onClick={() => context.resetQuiz()}>Reset Quiz</button>
    </div>
  )
}

describe('QuizContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    )

    expect(screen.getByTestId('current-score').textContent).toBe('0')
    expect(screen.getByTestId('high-score').textContent).toBe('0')
    expect(screen.getByTestId('dark-mode').textContent).toBe('light')
  })

  it('should add score and update high score', async () => {
    const user = userEvent.setup()
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    )

    const addScoreBtn = screen.getByText('Add Score')

    await user.click(addScoreBtn)

    await waitFor(() => {
      expect(screen.getByTestId('current-score').textContent).toBe('1')
      expect(screen.getByTestId('high-score').textContent).toBe('1')
    })
  })

  it('should toggle dark mode', async () => {
    const user = userEvent.setup()
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    )

    const toggleBtn = screen.getByText('Toggle Dark Mode')

    await user.click(toggleBtn)

    await waitFor(() => {
      expect(screen.getByTestId('dark-mode').textContent).toBe('dark')
    })
  })

  it('should persist high score to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    )

    const addScoreBtn = screen.getByText('Add Score')
    await user.click(addScoreBtn)
    await user.click(addScoreBtn)

    await waitFor(() => {
      expect(screen.getByTestId('high-score').textContent).toBe('2')
    })

    // Check localStorage was called
    expect(localStorage.setItem).toHaveBeenCalledWith('countryQuizHighScore', '2')
  })

  it('should reset quiz state', async () => {
    const user = userEvent.setup()
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    )

    const addScoreBtn = screen.getByText('Add Score')
    await user.click(addScoreBtn)

    await waitFor(() => {
      expect(screen.getByTestId('current-score').textContent).toBe('1')
    })

    const resetBtn = screen.getByText('Reset Quiz')
    await user.click(resetBtn)

    await waitFor(() => {
      expect(screen.getByTestId('current-score').textContent).toBe('0')
    })
  })
})
