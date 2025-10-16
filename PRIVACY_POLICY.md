# Privacy Policy for MindGuard - Focus Blocker

**Last Updated:** October 16, 2025

## Overview

MindGuard - Focus Blocker is a Chrome extension designed to help you stay focused by blocking distracting websites. We are committed to protecting your privacy and being transparent about how the extension works.

## Data Collection

**We do NOT collect, store, or transmit any personal data to external servers.**

All data is stored locally on your device using Chrome's local storage API. Specifically:

- **Blocked Sites List:** Your list of blocked websites, timeout settings, and usage statistics
- **Timer State:** Current active timers and time remaining
- **Daily Restart Counts:** Number of restarts used per site today

## Data Storage

All extension data is stored locally using:
- `chrome.storage.local` API
- Data never leaves your device
- Data is not synchronized across devices
- Data is automatically removed when you uninstall the extension

## Permissions Used

The extension requires the following permissions to function:

### storage
- **Purpose:** To save your blocked sites list and timer states locally on your device
- **Data Access:** Only data you explicitly configure in the extension

### tabs
- **Purpose:** To monitor which tabs you're actively viewing to start/stop timers
- **Data Access:** URLs of active tabs to match against your blocked sites list
- **Privacy:** URL information is only processed locally and never transmitted

### alarms
- **Purpose:** To schedule daily reset at midnight for restart counts
- **Data Access:** No data access, only scheduling functionality

### host_permissions (<all_urls>)
- **Purpose:** To detect when you visit a blocked site and redirect to the blocked page
- **Data Access:** URLs are checked locally against your configured sites
- **Privacy:** No browsing history is stored or transmitted

## Third-Party Services

The extension loads visual icons from:
- **Bootstrap Icons** via CDN (jsdelivr.net)
- **Purpose:** Display UI icons only
- **Data Shared:** None - standard static resource loading
- **Privacy:** No tracking or analytics included

## No Tracking or Analytics

We do NOT use:
- Google Analytics
- Tracking pixels
- Usage statistics collection
- Error reporting services
- Any form of telemetry

## Data Security

- All data is stored locally on your device
- Data is protected by Chrome's built-in security
- No server-side storage or database
- No user accounts or authentication required

## Children's Privacy

This extension does not knowingly collect information from children under 13. The extension is designed for general productivity use and contains no age-restricted content.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date above. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Your Rights

You have complete control over your data:
- **View:** All data is visible in the extension popup
- **Edit:** Modify or delete blocked sites at any time
- **Delete:** Uninstall the extension to remove all data

To manually clear all extension data:
1. Right-click the extension icon
2. Select "Manage Extension"
3. Click "Remove" or use developer console: `chrome.storage.local.clear()`

## Contact

For questions or concerns about this privacy policy or the extension:
- **Email:** [Your support email]
- **GitHub:** [Your repository URL if applicable]

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)

## Open Source

[Optional: If you make it open source]
The source code is available for review at [repository URL], allowing full transparency about data handling.

---

**Summary:** MindGuard - Focus Blocker respects your privacy. All data stays on your device. No tracking, no servers, no data collection.

