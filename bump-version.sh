#!/bin/bash

# Version Bump Script for Zenitsu Extension
# Usage: ./bump-version.sh [major|minor|patch]

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Get current version from manifest.json
CURRENT_VERSION=$(grep -o '"version": "[^"]*' manifest.json | cut -d'"' -f4)

# Parse version parts
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# Determine bump type (default to patch)
BUMP_TYPE="${1:-patch}"

case $BUMP_TYPE in
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    patch)
        PATCH=$((PATCH + 1))
        ;;
    *)
        echo -e "${RED}❌ Invalid bump type: $BUMP_TYPE${NC}"
        echo "Usage: ./bump-version.sh [major|minor|patch]"
        exit 1
        ;;
esac

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Zenitsu Version Bump Script       ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo ""
echo -e "${YELLOW}Current version:${NC} ${CURRENT_VERSION}"
echo -e "${GREEN}New version:${NC}     ${NEW_VERSION}"
echo -e "${BLUE}Bump type:${NC}       ${BUMP_TYPE}"
echo ""

# Confirm
read -p "Proceed with version bump? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Version bump cancelled${NC}"
    exit 0
fi

# Update manifest.json
echo -e "${BLUE}📝 Updating manifest.json...${NC}"
sed -i.bak "s/\"version\": \"${CURRENT_VERSION}\"/\"version\": \"${NEW_VERSION}\"/" manifest.json
rm manifest.json.bak

echo -e "${GREEN}✅ Version bumped to ${NEW_VERSION}${NC}"
echo ""
echo -e "${YELLOW}🚀 Next steps:${NC}"
echo "   1. Review changes: git diff manifest.json"
echo "   2. Run: ./build.sh"
echo "   3. Test the build"
echo "   4. Commit: git add manifest.json && git commit -m 'Bump version to ${NEW_VERSION}'"
echo "   5. Tag: git tag v${NEW_VERSION}"
echo "   6. Push: git push && git push --tags"
echo "   7. Upload zenitsu-v${NEW_VERSION}.zip to Chrome Web Store"
echo ""

