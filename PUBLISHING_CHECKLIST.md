# Chrome Web Store Publishing Checklist

## ✅ Pre-Publishing (One-Time Setup)

### Developer Account
- [ ] Register at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
- [ ] Pay $5 one-time registration fee
- [ ] Complete developer profile

### Privacy Policy
- [ ] Host `PRIVACY_POLICY.md` on public URL
- [ ] Add your support email to policy
- [ ] Verify URL is accessible
- [ ] **Your URL:** _________________

### Store Assets
- [ ] Create 3-5 screenshots (1280x800 or 640x400)
  - [ ] Screenshot 1: Popup interface (adding site)
  - [ ] Screenshot 2: Active timer with site list
  - [ ] Screenshot 3: Blocked page with encouragement
  - [ ] Screenshot 4: Features overview (optional)
  - [ ] Screenshot 5: Success state (optional)
- [ ] Create promotional tile (440x280) - optional
- [ ] Prepare icon for store (128x128) - ✅ Already have

### Store Listing Content
- [ ] Copy short description from `STORE_DESCRIPTION.md` (132 chars max)
- [ ] Copy detailed description from `STORE_DESCRIPTION.md`
- [ ] Prepare "What's New" text for v1.0.0
- [ ] Add support email: _________________

## ✅ Build & Test

### Build Extension
- [ ] Run `./build.sh`
- [ ] Verify build/ folder created
- [ ] Verify .zip file created
- [ ] Check file size (should be ~48KB)

### Test Build
- [ ] Load build/ folder in Chrome (chrome://extensions/)
- [ ] Add a test site (e.g., example.com, 1 min timeout)
- [ ] Verify timer starts when visiting site
- [ ] Verify timer pauses when switching tabs
- [ ] Wait for timer to expire
- [ ] Verify encouraging message appears
- [ ] Test restart functionality (3 restarts)
- [ ] Verify restart limit works
- [ ] Test delete site functionality
- [ ] Check for console errors (F12)
- [ ] Test with different domains
- [ ] Test with path-based blocking

## ✅ Upload to Chrome Web Store

### Initial Upload
- [ ] Go to Developer Dashboard
- [ ] Click "New Item"
- [ ] Upload `zenitsu-v1.0.0.zip`
- [ ] Wait for upload to process

### Store Listing
- [ ] **Title:** Zenitsu - Focus Blocker
- [ ] **Short description:** (from STORE_DESCRIPTION.md)
- [ ] **Detailed description:** (from STORE_DESCRIPTION.md)
- [ ] **Category:** Productivity
- [ ] **Language:** English
- [ ] **Privacy policy URL:** _________________
- [ ] **Support email:** _________________

### Screenshots & Images
- [ ] Upload 3-5 screenshots
- [ ] Upload promotional tile (optional)
- [ ] Verify all images display correctly

### Permissions Justification
- [ ] Explain `storage` permission
- [ ] Explain `tabs` permission
- [ ] Explain `alarms` permission
- [ ] Explain `host_permissions (<all_urls>)`

### Final Review
- [ ] Preview store listing
- [ ] Check for typos
- [ ] Verify all links work
- [ ] Verify screenshots are clear
- [ ] Double-check privacy policy URL

### Submit
- [ ] Click "Submit for review"
- [ ] Save confirmation email
- [ ] Note submission date: _________________

## ✅ Post-Submission

### Monitor Review
- [ ] Check email daily for review updates
- [ ] Expected review time: 1-3 business days
- [ ] Note review completion date: _________________

### If Approved
- [ ] Celebrate! 🎉
- [ ] Share extension link
- [ ] Monitor initial reviews
- [ ] Respond to user feedback

### If Rejected
- [ ] Read feedback carefully
- [ ] Fix identified issues
- [ ] Update build if needed
- [ ] Respond to reviewer
- [ ] Resubmit promptly

## ✅ For Future Updates

### Before Each Update
- [ ] Bump version: `./bump-version.sh [patch|minor|major]`
- [ ] Update code/features
- [ ] Run `./build.sh`
- [ ] Test thoroughly
- [ ] Update "What's New" text
- [ ] Review any new permissions

### Upload Update
- [ ] Go to Developer Dashboard
- [ ] Click on Zenitsu extension
- [ ] Click "Upload new package"
- [ ] Upload new .zip file
- [ ] Update "What's New" section
- [ ] Submit for review

## 📝 Important Notes

- **Review Time:** 1-3 business days typically
- **Support:** Respond to users within 24-48 hours
- **Updates:** Test thoroughly before publishing
- **Versioning:** Use semantic versioning (major.minor.patch)
- **Privacy:** Never collect user data without disclosure

## 🔗 Important Links

- Developer Dashboard: https://chrome.google.com/webstore/devconsole/
- Publishing Guide: https://developer.chrome.com/docs/webstore/publish/
- Program Policies: https://developer.chrome.com/docs/webstore/program-policies/
- Manifest V3 Docs: https://developer.chrome.com/docs/extensions/mv3/

## 📊 Success Metrics (Optional)

Track these after publishing:
- [ ] Number of users
- [ ] Average rating
- [ ] Review sentiment
- [ ] Feature requests
- [ ] Bug reports

---

**Last Updated:** Run date when you publish
**Current Version:** 1.0.0
**Status:** Ready for first submission ✅
