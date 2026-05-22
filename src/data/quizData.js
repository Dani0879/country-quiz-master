// Quiz questions data
export const quizData = [
  {
    id: 1,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/se.svg',
    correct: 'Sweden',
    options: ['Vietnam', 'Finland', 'Austria'],
  },
  {
    id: 2,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/jp.svg',
    correct: 'Japan',
    options: ['China', 'South Korea', 'Thailand'],
  },
  {
    id: 3,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/fr.svg',
    correct: 'France',
    options: ['Italy', 'Spain', 'Germany'],
  },
  {
    id: 4,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/gb.svg',
    correct: 'United Kingdom',
    options: ['Ireland', 'Scotland', 'Australia'],
  },
  {
    id: 5,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/mx.svg',
    correct: 'Mexico',
    options: ['Brazil', 'Colombia', 'Peru'],
  },
  {
    id: 6,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/ca.svg',
    correct: 'Canada',
    options: ['USA', 'Denmark', 'Australia'],
  },
  {
    id: 7,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/au.svg',
    correct: 'Australia',
    options: ['New Zealand', 'Fiji', 'Papua New Guinea'],
  },
  {
    id: 8,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/in.svg',
    correct: 'India',
    options: ['Bangladesh', 'Pakistan', 'Nepal'],
  },
  {
    id: 9,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/za.svg',
    correct: 'South Africa',
    options: ['Kenya', 'Nigeria', 'Ghana'],
  },
  {
    id: 10,
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/br.svg',
    correct: 'Brazil',
    options: ['Argentina', 'Chile', 'Uruguay'],
  },
]

// Shuffle array utility
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get shuffled options for a question
export const getShuffledOptions = (question) => {
  const options = [question.correct, ...question.options]
  return shuffleArray(options)
}
