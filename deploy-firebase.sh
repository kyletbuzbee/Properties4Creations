#!/bin/bash

# Firebase Deployment Script for Properties 4 Creations

echo "🚀 Deploying Properties 4 Creations to Firebase..."
echo "======================================================="

# Initialize deployment environment
echo "📋 Checking deployment requirements..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Install with: npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list --json | grep -q '"name"'; then
    echo "⚠️  Please login to Firebase first:"
    echo "   firebase login"
    echo ""
    echo "   Then link your project:"
    echo "   firebase use --add"
    echo "   Select your project when prompted"
    exit 1
fi

# Get project information
PROJECT_ID=$(firebase projects:list --json | jq -r '.result[0].projectId')
echo "🎯 Deploying to Firebase project: $PROJECT_ID"

# Build the application
echo ""
echo "🏗️  Building Next.js application..."
cd web

if npm run build; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

cd ..

# Deploy to Firebase
echo ""
echo "🔥 Deploying to Firebase..."
echo "   This may take several minutes..."

if firebase deploy --only hosting; then
    echo ""
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "==============================="
    echo ""
    echo "🌐 Your site is now live at:"
    echo "   https://$PROJECT_ID.web.app"
    echo "   https://$PROJECT_ID.firebaseapp.com"
    echo ""
    echo "📊 Next Steps:"
    echo "   1. Verify all pages load correctly"
    echo "   2. Test forms and interactive features"
    echo "   3. Configure domain in Firebase Console if needed"
    echo "   4. Set up monitoring and analytics"
    echo ""
    echo "🔧 Useful Firebase commands:"
    echo "   firebase hosting:sites:list      # List hosting sites"
    echo "   firebase functions:list          # Check functions"
    echo "   firebase logs                    # View recent logs"
    echo ""
else
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi
