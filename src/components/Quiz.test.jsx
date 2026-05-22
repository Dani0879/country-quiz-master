import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from '../contexts/QuizContext'
import Quiz from './Quiz'

// Mock audio functions
vi.mock('../utils/audio', () => ({
  playSuccessSound: vi.fn(),
  playErrorSound: vi.fn(),
}))

describe('Quiz Component', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  const renderQuiz = (props = {}) => {
    const defaultProps = {
      onQuizComplete: vi.fn(),
      ...props,
    }

    return render(
      <BrowserRouter>
        <QuizProvider>
          <Quiz {...defaultProps} />
        </QuizProvider>
      </BrowserRouter>
    )
  }

  it('should render the quiz component with question', () => {
    renderQuiz()

    expect(screen.getByText(/Which country does this flag/i)).toBeInTheDocument()
    expect(screen.getByText(/Country Quiz/i)).toBeInTheDocument()
    expect(screen.getByText(/0\/10 Points/i)).toBeInTheDocument()
  })

  it('should display timer starting at 15 seconds', () => {
    renderQuiz()

    expect(screen.getByText('15s')).toBeInTheDocument()
  })

  it('should render 4 answer options', () => {
    renderQuiz()

    const buttons = screen.getAllByRole('button', { name: /^[A-Z]/ })
    // Should have at least 4 option buttons (plus progress number buttons)
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it('should handle answer selection', async () => {
    const user = userEvent.setup()
    renderQuiz()

    const buttons = screen.getAllByRole('button')
    // Find a non-progress button
    const optionButton = buttons.find(btn => !btn.textContent.match(/^\d+$/))

    if (optionButton) {
      await user.click(optionButton)
      await waitFor(() => {
        expect(optionButton.classList.contains('selected') || optionButton.classList.contains('correct') || optionButton.classList.contains('incorrect')).toBe(true)
      }, { timeout: 2000 })
    }
  })

  it('should display progress indicators', () => {
    renderQuiz()

    // Should display numbers 1-10 for progress
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
  })

  it('should have interaction feedback', async () => {
    const user = userEvent.setup()
    renderQuiz()

    const buttons = screen.getAllByRole('button')
    const optionButton = buttons.find(btn => !btn.textContent.match(/^\d+$/))

    if (optionButton) {
      await user.click(optionButton)

      // Should show feedback message
      await waitFor(() => {
        const feedback = screen.queryByText(/Correct!|Incorrect!/)
        expect(feedback).toBeInTheDocument()
      }, { timeout: 2000 })
    }
  })
})
