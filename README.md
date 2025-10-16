# 🛡️ MindGuard - Focus Blocker

**Protecting your attention**

A Chrome extension to help you stay focused by blocking distracting websites with configurable timeouts and limited daily restarts.

## Features

- **Add Distracting Websites**: Easily add domains that distract you from work
- **Configurable Timeouts**: Set how long you can browse each site before it gets blocked
- **Path-Based Blocking**: Optionally block specific paths on a domain (e.g., only `/r/all` on Reddit)
- **Active Timer**: Timer only counts down while you're actively on the blocked site
- **Limited Restarts**: Restart the timer up to 3 times per day
- **Daily Reset**: All sites reset at midnight local time

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `zenitsu` directory
5. The extension is now installed and ready to use!

## Usage

### Adding a Site

1. Click the MindGuard extension icon in your toolbar
2. Fill in the form:
   - **Domain**: Enter the domain without `http://` or `www.` (e.g., `reddit.com`)
   - **Path** (optional): Enter a specific path to block (e.g., `/r/all`)
   - **Timeout**: Set the allowed time in minutes before blocking
3. Click "Add Site"

### How It Works

1. Once you visit a tracked site, the timer starts counting down
2. You can browse the site until the timer reaches zero
3. When blocked, you'll see a block page showing:
   - Time remaining until midnight reset
   - Number of restarts used today
   - Option to restart (if restarts remain)
4. You can restart the timer up to 3 times per day
5. At midnight, all sites reset automatically

### Managing Sites

- View all tracked sites in the popup
- See real-time countdown and restart status
- Delete sites by clicking the × button
- Sites with active timers are highlighted in orange
- Blocked sites are highlighted in red

## Technical Details

- **Manifest Version**: 3
- **Permissions**: storage, tabs, alarms
- **Architecture**: Service worker background script with popup UI
- **Storage**: Chrome local storage for site data
- **Timer**: Active-only countdown (only decrements when on the site)

## Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- No tracking or analytics

## Icons

The extension uses:
- Bootstrap Icons (v1.13.1) loaded from CDN for UI elements
- Custom zen-mode icon for the extension (resized to 16x16, 48x48, 128x128):
  - Source: `icons/zen-mode.png`
  - `icons/icon16.png` (16x16)
  - `icons/icon48.png` (48x48)
  - `icons/icon128.png` (128x128)

## License

MIT License - Feel free to modify and distribute as needed.


