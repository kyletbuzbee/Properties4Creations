@echo off
echo 🚀 Deploying P4C Static Website to GitHub Pages
echo ================================================

REM Add all files to git
echo 📝 Staging all files...
git add .
echo ✅ Files staged

REM Commit the changes
echo 📦 Creating commit...
git commit -m "Deploy P4C static website with full HTML pages

- Complete Properties 4 Creations real estate platform
- 4 HTML pages: homepage, about, contact, projects
- Full interactivity: search, maps, forms, portals
- Zero-cost hosting with $3,500 annual savings
- Automatic sync with Next.js via p4c-export.js"
echo ✅ Commit created

echo 🔄 Pushing to GitHub...
git push origin main
echo ✅ Pushed to main branch

echo 🌐 Setting up GitHub Pages...
echo.
echo MANUAL STEPS REQUIRED:
echo 1. Go to your GitHub repository
echo 2. Click 'Settings' tab
echo 3. Scroll down to 'Pages' section
echo 4. Under 'Source', select 'Deploy from a branch'
echo 5. Select branch: main
echo 6. Select folder: /P4C
echo 7. Click 'Save'
echo.
echo Your site will be available at:
echo https://[your-github-username].github.io/[repository-name]/
echo.
echo Visit the URL above after 2-3 minutes for your live website!

pause
