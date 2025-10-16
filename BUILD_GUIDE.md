# Zenitsu Extension - Build & Publishing Guide

## Overview

This guide explains how to build and publish the Zenitsu Chrome Extension to the Chrome Web Store.

## Quick Start

```bash
# Build the extension
./build.sh

# Output: build/ folder and zenitsu-v1.0.0.zip
```

## Build System

### Files Created

1. **`build.sh`** - Main build script
   - Creates clean build directory
   - Copies only necessary files
   - Generates zip file for Chrome Web Store
   - Shows size and file summary

2. **`bump-version.sh`** - Version management script
   - Bumps major, minor, or patch version
   - Updates manifest.json
   - Provides git workflow guidance

3. **Build Output**
   - `build/` - Clean directory with production files
   - `zenitsu-v{version}.zip` - Ready for upload

## Publishing Workflow

### First-Time Publishing

1. **Prepare Extension**
   ```bash
   ./build.sh
   ```

2. **Test Build**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/` directory
   - Test all features thoroughly

3. **Create Developer Account**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Pay $5 one-time registration fee
   - Complete developer profile

4. **Prepare Store Listing**
   
   **Required Assets:**
   - Screenshots (1280x800 or 640x400): 3-5 images
   - Small promotional tile (440x280): Optional
   - Privacy policy URL: Host PRIVACY_POLICY.md publicly
   
   **Store Details:**
   - Use content from `STORE_DESCRIPTION.md`
   - Short description (132 chars max)
   - Detailed description
   - Category: Productivity
   - Language: English

5. **Upload Extension**
   - In Developer Dashboard, click "New Item"
   - Upload `zenitsu-v1.0.0.zip`
   - Fill in store listing details
   - Add screenshots
   - Enter privacy policy URL
   - Submit for review

6. **Review Process**
   - Typically takes 1-3 business days
   - Check email for approval or feedback
   - Address any issues if rejected

### Publishing Updates

When you want to release a new version:

1. **Bump Version**
   ```bash
   # Patch version (1.0.0 → 1.0.1) - Bug fixes
   ./bump-version.sh patch
   
   # Minor version (1.0.0 → 1.1.0) - New features
   ./bump-version.sh minor
   
   # Major version (1.0.0 → 2.0.0) - Breaking changes
   ./bump-version.sh major
   ```

2. **Build New Version**
   ```bash
   ./build.sh
   ```

3. **Test Thoroughly**
   - Load `build/` in Chrome
   - Test all features
   - Check for regressions

4. **Update Store Listing** (if needed)
   - Update description
   - Add new screenshots
   - Update "What's new" section

5. **Upload to Store**
   - Go to Developer Dashboard
   - Click on your extension
   - Click "Upload new package"
   - Upload new `zenitsu-v{version}.zip`
   - Describe changes in "What's new"
   - Submit for review

6. **Git Workflow** (optional but recommended)
   ```bash
   git add manifest.json
   git commit -m "Bump version to 1.0.1"
   git tag v1.0.1
   git push && git push --tags
   ```

## Build Contents

The build includes only production-ready files:

### Extension Files
- `manifest.json` - Extension configuration
- `storage.js` - Storage utilities
- `background.js` - Service worker
- `popup.html/css/js` - Popup interface
- `blocked.html/css/js` - Blocked page
- `icons/` - Extension icons (16, 48, 128)

### Documentation
- `README.md` - User documentation
- `PRIVACY_POLICY.md` - Required for store
- `STORE_DESCRIPTION.md` - Store listing content

### Excluded Files
These development files are NOT included in the build:
- `test.html` - Test page
- `*.txt` - Development summaries
- `TESTING.md` - Test documentation
- `.plan.md` - Planning files
- `build.sh` - Build script
- `bump-version.sh` - Version script
- Development documentation

## Privacy Policy Hosting

You MUST host the privacy policy on a public URL. Options:

1. **GitHub Pages** (Free)
   - Create repo: `zenitsu-extension`
   - Enable GitHub Pages
   - Add `PRIVACY_POLICY.md` to docs folder
   - URL: `https://yourusername.github.io/zenitsu-extension/PRIVACY_POLICY.html`

2. **Your Website**
   - Host on your domain: `https://yoursite.com/zenitsu/privacy`

3. **Google Sites** (Free)
   - Create simple site with privacy policy
   - Publish and use URL

## Screenshot Guidelines

Create 3-5 screenshots showing:

1. **Popup Interface** - Adding a new site
2. **Sites List** - Show active timer counting down
3. **Blocked Page** - Encouraging message displayed
4. **Features Overview** - Highlight key features
5. **Success State** - Site management view

**Requirements:**
- Size: 1280x800 or 640x400 pixels
- Format: PNG or JPEG
- Show actual extension UI
- No excessive branding or borders

**Tips:**
- Use Chrome's full-screen mode
- Capture clean, professional screenshots
- Show real use cases
- Highlight yellow lightning theme

## Store Listing Tips

### Title
Keep it simple and searchable:
- "Zenitsu - Focus Blocker"
- "Zenitsu Website Blocker"

### Short Description (132 chars)
From STORE_DESCRIPTION.md - emphasize key benefit

### Detailed Description
Use the full content from STORE_DESCRIPTION.md:
- Start with problem/solution
- List features with emojis
- Explain how it works
- Highlight privacy
- Include use cases

### Category
- Primary: Productivity
- Consider: Tools, Developer Tools

### Language
- English (add more if you support them)

## Review Process

### What Chrome Reviews
- Code security
- Permissions justified
- Privacy policy present and accurate
- No malware or suspicious code
- Store listing accuracy
- User experience

### Common Rejection Reasons
- Missing privacy policy
- Excessive permissions
- Misleading store listing
- Poor code quality
- Privacy violations

### If Rejected
- Read feedback carefully
- Fix issues
- Respond to reviewer
- Resubmit promptly

## Support Email

Add a support email for users:
1. Create dedicated email: `zenitsu-support@yourdomain.com`
2. Add to store listing
3. Monitor for user feedback
4. Respond within 24-48 hours

## Version Numbering

Follow semantic versioning:
- **Major (X.0.0):** Breaking changes, major redesign
- **Minor (1.X.0):** New features, no breaking changes
- **Patch (1.0.X):** Bug fixes, minor improvements

## Troubleshooting

### Build Script Fails
```bash
# Check permissions
chmod +x build.sh

# Check if all files exist
ls -la manifest.json storage.js background.js
```

### Zip File Too Large
- Check for accidentally included files
- Remove any test images or large assets
- Maximum size: 128 MB (you're at ~48KB, well under limit)

### Version Bump Issues
```bash
# Manually edit manifest.json if script fails
vim manifest.json
# Change: "version": "1.0.0" to "version": "1.0.1"
```

## Maintenance

### Regular Tasks
- Monitor Chrome Web Store reviews
- Respond to user feedback
- Check for Chrome API changes
- Update dependencies (if any added)
- Test on new Chrome versions

### When to Update
- Bug reports from users
- New Chrome version breaks features
- Security vulnerabilities
- Feature requests
- UI improvements

## Resources

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
- [Chrome Extension Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Web Store Policies](https://developer.chrome.com/docs/webstore/program-policies/)

## Checklist

### Before First Publish
- [ ] Run `./build.sh` successfully
- [ ] Test build in Chrome thoroughly
- [ ] Create 3-5 screenshots
- [ ] Host privacy policy publicly
- [ ] Register Chrome Web Store developer account ($5)
- [ ] Prepare store listing text
- [ ] Review all permissions
- [ ] Test on different screen sizes

### Before Each Update
- [ ] Update version: `./bump-version.sh [type]`
- [ ] Run `./build.sh`
- [ ] Test all features
- [ ] Update "What's new" text
- [ ] Review any new permissions
- [ ] Check for console errors
- [ ] Test fresh install

## Quick Reference

```bash
# Build for production
./build.sh

# Bump patch version (1.0.0 → 1.0.1)
./bump-version.sh patch

# Bump minor version (1.0.0 → 1.1.0)
./bump-version.sh minor

# Bump major version (1.0.0 → 2.0.0)
./bump-version.sh major

# Test build
cd build
# Load in chrome://extensions/
```

---

**Remember:** Test thoroughly, be honest in your store listing, and respond to user feedback promptly. Good luck with your extension! ⚡

