# Installation Guide

## Quick Start

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or use the menu: Chrome → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `zenitsu` directory (this folder)
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "MindGuard - Focus Blocker"
   - Click the pin icon to keep it visible

## First Use

1. Click the MindGuard extension icon in your toolbar
2. Add your first distracting website:
   - **Domain**: Enter without `http://` or `www.` (e.g., `reddit.com`)
   - **Path** (optional): Specify a path if you want to block only part of the site (e.g., `/r/all`)
   - **Timeout**: Set how many minutes you can browse before it blocks
3. Click "Add Site"

## How It Works

- When you visit a tracked site, a timer starts counting down
- The timer only decrements while you're actively on that site
- Once time runs out, the site is blocked
- You can restart the timer up to 3 times per day
- Everything resets at midnight

## Troubleshooting

### Extension Not Working
- Make sure you're using Chrome (or Chromium-based browser)
- Check that the extension is enabled in `chrome://extensions/`
- Verify all files are present in the directory

### Sites Not Blocking
- Ensure the domain name matches exactly (without `www.` prefix)
- Check that the extension has the necessary permissions
- Try removing and re-adding the site

### Icons Not Showing
- The extension uses Bootstrap Icons from CDN
- Ensure you have internet connectivity for icons to load
- Extension icons (16x16, 48x48, 128x128 PNG) should be in the `icons/` folder

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "MindGuard - Focus Blocker"
3. Click "Remove"
4. Confirm the removal

Your data is stored locally and will be removed with the extension.

