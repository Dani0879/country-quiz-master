# SETUP INSTRUCTIONS

## 🚀 Quick Start

### Option 1: Automated Setup

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to http://localhost:5173

## 📚 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm test` | Run unit tests |
| `npm run test:ui` | Run tests with visual UI |

## 📦 Installation Checklist

- [ ] Node.js 16+ installed
- [ ] npm or yarn available
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] App opens at http://localhost:5173

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run tests with UI:
```bash
npm run test:ui
```

### Run specific test file:
```bash
npm test -- Quiz.test.jsx
```

## 🔍 Code Quality

### Check for linting issues:
```bash
npm run lint
```

### Automatically fix linting issues:
```bash
npm run lint:fix
```

## 📝 Git Workflow

The project should have multiple commits showing development progression:

```bash
git init
git add .
git commit -m "Initial project setup with React Router and Tailwind"

# After feature implementation
git add src/components/Quiz.jsx
git commit -m "Add Quiz component with timer functionality"

# After tests
git add src/contexts/QuizContext.test.jsx
git commit -m "Add QuizContext unit tests"

# And so on...
```

## 🌐 Deployment

The build output is in the `dist/` folder after running `npm run build`.

### Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify:
- Push to GitHub
- Connect repository on Netlify dashboard
- Select `dist` as publish directory

## 🐛 Troubleshooting

### "Port 5173 already in use"
```bash
# Kill the process or use a different port:
npm run dev -- --port 5174
```

### "Module not found" errors
```bash
# Clear node_modules and reinstall:
rm -rf node_modules package-lock.json
npm install
```

### Tests not running
```bash
# Ensure test dependencies are installed:
npm install --save-dev @testing-library/react @testing-library/user-event vitest jsdom
```

## 📖 Project Documentation

- See [README.md](./README.md) for full project documentation
- See [src/test/README.md](./src/test/README.md) for testing guidelines
- See [src/components/](./src/components/) for component documentation

---

**Ready to develop? Run `npm run dev` and start building! 🎉**
