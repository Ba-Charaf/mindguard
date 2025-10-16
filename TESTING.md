# Testing Guide

## Manual Testing Checklist

### Installation & Setup
- [ ] Extension loads without errors in Chrome
- [ ] Extension icon appears in toolbar
- [ ] Popup opens when clicking extension icon
- [ ] Bootstrap Icons load correctly (check for icons in UI)

### Adding Sites
- [ ] Can add a site with just domain (e.g., `reddit.com`)
- [ ] Can add a site with domain + path (e.g., `reddit.com` with `/r/all`)
- [ ] Form validation works (required fields, min timeout value)
- [ ] Domain cleaning works (removes `http://`, `www.`, trailing slashes)
- [ ] Path formatting works (adds leading `/` if missing)
- [ ] New site appears in the list immediately

### Timer Functionality
- [ ] Timer starts when visiting a tracked site
- [ ] Timer only counts down when actively on the site
- [ ] Timer pauses when switching to another tab
- [ ] Timer pauses when focusing another window
- [ ] Timer resumes when returning to the tracked site
- [ ] Countdown displays correctly in popup (updates every second)

### Blocking Behavior
- [ ] Site redirects to blocked page when time reaches 0
- [ ] Blocked page shows correct domain/path
- [ ] Blocked page shows time remaining (should be 0:00)
- [ ] Blocked page shows correct restart count
- [ ] Site card in popup shows "Blocked" status badge
- [ ] Trying to visit blocked site redirects to blocked page

### Restart Functionality
- [ ] Restart button is enabled when restarts < 3
- [ ] Restart button is disabled when restarts = 3
- [ ] Clicking restart increments restart count
- [ ] Clicking restart resets timer to initial value
- [ ] Clicking restart unblocks the site
- [ ] After restart, can visit site again
- [ ] Restart count persists across browser restarts

### Daily Reset (Midnight)
- [ ] Midnight alarm is created on extension load
- [ ] At midnight, restart counts reset to 0
- [ ] At midnight, blocked status resets to false
- [ ] At midnight, timers reset to initial values
- [ ] Daily reset works across browser restarts

### Domain Matching
- [ ] `reddit.com` blocks `www.reddit.com`
- [ ] `reddit.com` blocks `reddit.com/anything`
- [ ] `reddit.com` blocks `old.reddit.com` (subdomain)
- [ ] `reddit.com` with path `/r/all` blocks `reddit.com/r/all/posts`
- [ ] `reddit.com` with path `/r/all` does NOT block `reddit.com/r/programming`
- [ ] Extension pages (chrome://) are not tracked
- [ ] Extension internal pages are not blocked

### Site Management
- [ ] Can delete a site from the list
- [ ] Deletion requires confirmation
- [ ] Deleting a site removes it immediately
- [ ] Deleted site data doesn't persist
- [ ] Can re-add a deleted site

### UI/UX
- [ ] Active sites show orange highlight
- [ ] Blocked sites show red highlight
- [ ] Status badges display correctly with icons
- [ ] Time displays in MM:SS format
- [ ] Restart count displays as X/3
- [ ] Colors change based on status (ok/warning/blocked)
- [ ] Empty state shows when no sites added
- [ ] Popup updates in real-time (every second)

### Data Persistence
- [ ] Sites persist after closing popup
- [ ] Timer state persists across browser restarts
- [ ] Restart counts persist across browser restarts
- [ ] Blocked status persists across browser restarts

### Edge Cases
- [ ] Works with very short timeouts (1 minute)
- [ ] Works with very long timeouts (999 minutes)
- [ ] Handles rapid tab switching correctly
- [ ] Handles multiple windows correctly
- [ ] Works when browser loses/regains focus
- [ ] Handles invalid domains gracefully
- [ ] Handles special characters in paths

## Automated Testing Ideas

While this extension doesn't have automated tests yet, here are areas that could benefit:

1. **Storage Helper Tests**
   - CRUD operations on sites
   - Data validation
   - Edge cases (empty data, corrupted data)

2. **Domain Matching Tests**
   - Various domain formats
   - Path matching logic
   - Subdomain handling

3. **Timer Logic Tests**
   - Countdown accuracy
   - Pause/resume behavior
   - State transitions

4. **Date/Time Tests**
   - Midnight calculation
   - Timezone handling
   - Daily reset logic

## Test Data

Use these test sites (replace with actual distracting sites):

```
Domain: example.com, Path: (empty), Timeout: 1 minute
Domain: test.com, Path: /path, Timeout: 5 minutes
Domain: demo.org, Path: (empty), Timeout: 30 minutes
```

## Known Limitations

- Extension requires internet for Bootstrap Icons to load
- Midnight reset uses local time (not configurable)
- No way to pause timer without leaving the site
- No statistics or history tracking
- No export/import of site lists
- Timer granularity is 1 second (not milliseconds)

## Debugging Tips

1. **Check Background Service Worker**
   - Go to `chrome://extensions/`
   - Find Zenitsu extension
   - Click "service worker" link to see console logs

2. **Check Storage**
   - In service worker console: `chrome.storage.local.get(console.log)`

3. **Check Alarms**
   - In service worker console: `chrome.alarms.getAll(console.log)`

4. **Force Midnight Reset**
   - In service worker console: Call the reset function directly

5. **Clear All Data**
   - In service worker console: `chrome.storage.local.clear()`

