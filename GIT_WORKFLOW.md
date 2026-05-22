# Git Workflow Guide

## Required: Multiple Commits

This project requires multiple commits to show development progression. DO NOT upload everything in a single commit!

## Recommended Commit Strategy

### 1. Initial Project Setup
```bash
git add package.json vite.config.js tailwind.config.js postcss.config.js eslint.config.js
git commit -m "feat: Initial project setup with React, Vite, Tailwind CSS, and ESLint"
```

### 2. Context and Data
```bash
git add src/contexts/QuizContext.jsx src/data/quizData.js src/utils/audio.js
git commit -m "feat: Add QuizContext for state management and quiz data"
```

### 3. Core Components
```bash
git add src/components/Home.jsx src/components/Quiz.jsx src/components/Results.jsx src/components/Header.jsx
git commit -m "feat: Add main components (Home, Quiz, Results, Header)"
```

### 4. Main App Structure
```bash
git add src/App.jsx src/main.jsx src/index.css index.html
git commit -m "feat: Setup React Router and styling"
```

### 5. Unit Tests
```bash
git add src/contexts/QuizContext.test.jsx src/components/Quiz.test.jsx src/components/Results.test.jsx src/components/Home.test.jsx src/test/setup.js
git commit -m "test: Add 4+ unit tests for components and context"
```

### 6. Documentation and Build Config
```bash
git add README.md SETUP.md .gitignore vitest.config.js
git commit -m "docs: Add project documentation and test configuration"
```

## Best Practices

✅ **DO:**
- Create meaningful commit messages
- Commit after completing each feature
- One feature or fix per commit
- Use imperative mood: "Add feature" not "Added feature"
- Reference components or features in commit messages

❌ **DON'T:**
- Don't upload everything in one commit
- Don't have hundreds of files in a single commit
- Don't use generic messages like "update" or "fix"
- Don't commit without meaningful context

## Commit Message Format

```
type: short description

Longer description if needed.
- Detail 1
- Detail 2

Related to feature: Timer Mode, High Score, etc.
```

### Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `test` - Tests
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements

## Example Full Workflow

```bash
# Initialize git
git init
git add .
git commit -m "chore: Initial project scaffolding"

# Feature 1: Context and state
git add src/contexts/
git commit -m "feat: Add QuizContext for global state management"

# Feature 2: Quiz component with timer
git add src/components/Quiz.jsx src/utils/audio.js
git commit -m "feat: Add Quiz component with 15-second timer and audio feedback"

# Feature 3: Tests
git add src/**/*.test.jsx
git commit -m "test: Add unit tests for Quiz, Home, Results, and Context"

# Fix/Enhancement
git add src/index.css
git commit -m "style: Add dark mode support to Tailwind CSS"

# Documentation
git add README.md SETUP.md
git commit -m "docs: Add comprehensive project documentation"
```

This shows meaningful development progression! ✨
