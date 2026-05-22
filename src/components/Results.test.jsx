import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from '../contexts/QuizContext'
import Results from './Results'

describe('Results Component', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  const renderResults = (props = {}) => {
    const defaultProps = {
      onPlayAgain: vi.fn(),
      ...props,
    }

    return render(
      <BrowserRouter>
        <QuizProvider>
          <Results {...defaultProps} />
        </QuizProvider>
      </BrowserRouter>
    )
  }

  it('should render results screen with congratulations message', () => {
    renderResults()

    expect(screen.getByText(/Congrats! You completed the quiz/i)).toBeInTheDocument()
  })

  it('should display the score', () => {
    renderResults()

    expect(screen.getByText(/You answer.*correctly/i)).toBeInTheDocument()
  })

  it('should have play again button', async () => {
    const onPlayAgain = vi.fn()
    const user = userEvent.setup()

    renderResults({ onPlayAgain })

    const playAgainBtn = screen.getByText(/Play again/i)
    expect(playAgainBtn).toBeInTheDocument()

    await user.click(playAgainBtn)
    expect(playAgainBtn).toBeInTheDocument()
  })

  it('should have back to home button', () => {
    renderResults()

    expect(screen.getByText(/Back to Home/i)).toBeInTheDocument()
  })

  it('should display score percentage', () => {
    renderResults()

    expect(screen.getByText(/Score:/i)).toBeInTheDocument()
  })
})
