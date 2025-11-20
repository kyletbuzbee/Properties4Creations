@echo off
REM Windows Batch Script to Fix npm install EBUSY errors

echo 🚨 NPM EBUSY Error Fix Script
echo ================================
echo.

echo 📁 Working in directory: %cd%
echo.

echo Step 1: Stopping any running Node processes...
echo.
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.cmd >nul 2>&1
timeout /t 2 /nobreak >nul

echo Step 2: Clearing npm cache...
echo.
call npm cache clean --force
timeout /t 2 /nobreak >nul

echo Step 3: Removing node_modules and package-lock.json...
echo.
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
timeout /t 3 /nobreak >nul

echo Step 4: Running fresh npm install...
echo.
call npm install

if %errorlevel% EQU 0 (
    echo.
    echo 🎉 SUCCESS! Dependencies installed successfully.
    echo.
    echo 🚀 Your project is ready for deployment!
    echo    Run './deploy-firebase.sh' to deploy to Firebase
    echo.
) else (
    echo.
    echo ❌ Installation failed. Trying alternative approach...
    echo.
    echo 🔄 Attempting with legacy peer deps...
    call npm install --legacy-peer-deps
    echo.
    if %errorlevel% EQU 0 (
        echo 🎉 SUCCESS with legacy peer deps!
    ) else (
        echo ❌ Still failing. Manual steps:
        echo   1. Close all editors/IDEs
        echo   2. Reboot computer if needed
        echo   3. Run: npm install --no-optional
        echo   4. Try: npm install --force
        echo   5. Contact support if persists
    )
)

echo.
echo 📝 Next steps:
echo   • Configure environment variables in web/.env.local
echo   • Get Mapbox API token from mapbox.com
echo   • Run './deploy-firebase.sh' for deployment
echo.
pause
