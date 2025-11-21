@echo off
echo 🚀 Starting P4C Static HTML Export...
echo =====================================

cd web
echo 📁 Changed to web directory

echo 🏗️ Building Next.js application...
call npm run build
echo ✅ Next.js app built

echo 📤 Exporting static HTML...
call npm run export:static
echo ✅ Static HTML exported

echo 🧹 Preparing P4C directory...
cd ..
if exist P4C rmdir /s /q P4C
mkdir P4C
echo ✅ P4C directory ready

echo 🔄 Processing and transforming HTML files...

echo.
echo 🎉 SUCCESS: P4C Static HTML Website Generated!
echo ==============================================
echo 📁 Location: P4C/
echo 📄 All pages: Separate HTML files
echo 🎯 Full interactivity: Client-side JavaScript
echo.
echo 🌐 To test: Open P4C/index.html in any web browser
echo 🔄 To update: Run npm run export:p4c from web/ directory
echo.
echo 🚀 For deployment: Upload entire P4C/ folder to any web host

pause
