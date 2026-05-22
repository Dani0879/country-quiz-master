@echo off
REM Country Quiz - Project Setup Script for Windows

echo 🌍 Country Quiz - React Setup
echo ==============================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo 📚 Available commands:
echo   npm run dev       - Start development server
echo   npm run build     - Build for production
echo   npm run lint      - Check code quality
echo   npm test          - Run unit tests
echo   npm run test:ui   - Run tests with UI
echo.
echo 🚀 To start the development server, run: npm run dev
echo.
pause
