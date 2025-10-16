#!/bin/bash

# Zenitsu Chrome Extension Build Script
# This script creates a clean build ready for Chrome Web Store submission

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MindGuard Extension Build Script    ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo ""

# Get version from manifest.json
VERSION=$(grep -o '"version": "[^"]*' manifest.json | cut -d'"' -f4)
echo -e "${GREEN}📦 Building version: ${VERSION}${NC}"
echo ""

# Clean previous build
if [ -d "build" ]; then
    echo -e "${YELLOW}🧹 Cleaning previous build...${NC}"
    rm -rf build
fi

# Create build directory
echo -e "${BLUE}📁 Creating build directory...${NC}"
mkdir -p build

# Copy essential extension files
echo -e "${BLUE}📄 Copying extension files...${NC}"
cp manifest.json build/
cp storage.js build/
cp background.js build/
cp popup.html build/
cp popup.css build/
cp popup.js build/
cp blocked.html build/
cp blocked.css build/
cp blocked.js build/

# Copy icons directory
echo -e "${BLUE}🎨 Copying icons...${NC}"
mkdir -p build/icons
cp icons/icon16.png build/icons/
cp icons/icon48.png build/icons/
cp icons/icon128.png build/icons/

# Copy zen-mode background image
echo -e "${BLUE}🎨 Copying zen-mode background...${NC}"
cp zen-mode.png build/

# Copy documentation for store
echo -e "${BLUE}📝 Copying documentation...${NC}"
cp README.md build/
cp PRIVACY_POLICY.md build/
cp STORE_DESCRIPTION.md build/

# Create a clean zip file for Chrome Web Store
ZIP_NAME="mindguard-v${VERSION}.zip"
echo -e "${BLUE}📦 Creating zip file: ${ZIP_NAME}...${NC}"
cd build
zip -r "../${ZIP_NAME}" . -x "*.DS_Store" ".*" > /dev/null 2>&1
cd ..

# Calculate sizes
BUILD_SIZE=$(du -sh build | cut -f1)
ZIP_SIZE=$(du -sh "${ZIP_NAME}" | cut -f1)

# Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          Build Complete! ✓             ║${NC}"
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo ""
echo -e "${GREEN}Version:${NC}       ${VERSION}"
echo -e "${GREEN}Build folder:${NC}  build/ (${BUILD_SIZE})"
echo -e "${GREEN}ZIP file:${NC}      ${ZIP_NAME} (${ZIP_SIZE})"
echo ""
echo -e "${BLUE}📋 Files included:${NC}"
echo "   ✓ manifest.json"
echo "   ✓ Core JS files (storage.js, background.js)"
echo "   ✓ Popup files (HTML, CSS, JS)"
echo "   ✓ Blocked page files (HTML, CSS, JS)"
echo "   ✓ Icons (16x16, 48x48, 128x128)"
echo "   ✓ README.md"
echo "   ✓ PRIVACY_POLICY.md"
echo "   ✓ STORE_DESCRIPTION.md"
echo ""
echo -e "${YELLOW}🚀 Next steps:${NC}"
echo "   1. Review files in build/ directory"
echo "   2. Test the extension by loading build/ in Chrome"
echo "   3. Upload ${ZIP_NAME} to Chrome Web Store"
echo ""
echo -e "${BLUE}📖 Chrome Web Store Developer Dashboard:${NC}"
echo "   https://chrome.google.com/webstore/devconsole/"
echo ""
echo -e "${GREEN}✨ Build completed successfully!${NC}"

