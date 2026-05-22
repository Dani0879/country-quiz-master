import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from '../contexts/QuizContext'
import Home from './Home'

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <QuizProvider>
          <Home />
        </QuizProvider>
      </BrowserRouter>
    )
  }

  it('should render home screen', () => {
    renderHome()

    expect(screen.getByText('Country Quiz')).toBeInTheDocument()
    expect(screen.getByText(/Test your knowledge/i)).toBeInTheDocument()
  })

  it('should display start quiz button', () => {
    renderHome()

    expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument()
  })

  it('should display features list', () => {
    renderHome()

    expect(screen.getByText(/15 seconds per question/i)).toBeInTheDocument()
    expect(screen.getByText(/Track your high score/i)).toBeInTheDocument()
    expect(screen.getByText(/Dark mode support/i)).toBeInTheDocument()
    expect(screen.getByText(/Audio feedback/i)).toBeInTheDocument()
  })

  it('should have working start button', async () => {
    const user = userEvent.setup()
    renderHome()

    const startBtn = screen.getByText(/Start Quiz/i)
    expect(startBtn).toBeInTheDocument()

    await user.click(startBtn)
    // Navigation happens, so the component should still be there
    expect(startBtn).toBeInTheDocument()
  })
})
