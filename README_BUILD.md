# 🚀 Zenitsu Build System

## Quick Commands

```bash
# Build for production
./build.sh

# Bump version and rebuild
./bump-version.sh patch  # Bug fixes (1.0.0 → 1.0.1)
./bump-version.sh minor  # New features (1.0.0 → 1.1.0)
./bump-version.sh major  # Breaking changes (1.0.0 → 2.0.0)
```

## What Gets Built

### ✅ Included in `build/` folder:
- Core extension files (manifest, JS, HTML, CSS)
- Icons (16x16, 48x48, 128x128)
- Documentation (README, Privacy Policy, Store Description)

### ❌ Excluded from build:
- Development files (test.html, *.txt)
- Build scripts (build.sh, bump-version.sh)
- Planning documents (*.plan.md)
- Testing documentation (TESTING.md)

## Output Files

- **`build/`** - Clean directory ready for testing (100KB)
- **`zenitsu-v{version}.zip`** - Package for Chrome Web Store upload (48KB)

## Testing the Build

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/` folder
5. Test all features thoroughly

## Publishing Workflow

### First Time:
1. ✅ Run `./build.sh` (Done!)
2. ⚠️  Host `PRIVACY_POLICY.md` on public URL
3. ⚠️  Create 3-5 screenshots (1280x800 or 640x400)
4. ⚠️  Register at [Chrome Web Store](https://chrome.google.com/webstore/devconsole/) ($5)
5. Upload `zenitsu-v1.0.0.zip`
6. Fill store listing using `STORE_DESCRIPTION.md`
7. Submit for review (1-3 days)

### Updates:
1. Make code changes
2. Run `./bump-version.sh [type]`
3. Run `./build.sh`
4. Test thoroughly
5. Upload new ZIP to store
6. Submit update

## Documentation

- **`BUILD_GUIDE.md`** - Comprehensive build documentation
- **`PUBLISHING_CHECKLIST.md`** - Step-by-step submission guide
- **`PRIVACY_POLICY.md`** - Privacy policy (host this publicly!)
- **`STORE_DESCRIPTION.md`** - Copy/paste for store listing

## Current Status

- **Version:** 1.0.0
- **Build Status:** ✅ Complete
- **Build Size:** 48KB (zipped)
- **Ready to Publish:** Yes (after hosting privacy policy & creating screenshots)

## Support

For detailed guides:
- Build questions → See `BUILD_GUIDE.md`
- Publishing help → See `PUBLISHING_CHECKLIST.md`
- Features/testing → See main `README.md`

---

**⚡ Ready to focus and ship! Good luck with your Chrome Web Store submission!**

