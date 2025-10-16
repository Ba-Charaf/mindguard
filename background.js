// Background service worker for timer and blocking logic
importScripts('storage.js');

// URL matching utility
function matchesSite(url, site) {
  try {
    const urlObj = new URL(url);
    let hostname = urlObj.hostname.toLowerCase();
    
    // Remove www. prefix for comparison
    hostname = hostname.replace(/^www\./, '');
    const siteDomain = site.domain.toLowerCase().replace(/^www\./, '');
    
    // Check if hostname matches or is a subdomain
    const domainMatches = hostname === siteDomain || hostname.endsWith('.' + siteDomain);
    
    if (!domainMatches) {
      return false;
    }
    
    // If path is specified, check if URL path starts with it
    if (site.path) {
      const urlPath = urlObj.pathname;
      return urlPath.startsWith(site.path);
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

// Find matching site for a URL
async function findMatchingSite(url) {
  if (!url || url.startsWith('chrome://') || url.startsWith('chrome-extension://')) {
    return null;
  }
  
  const sites = await StorageHelper.getSites();
  return sites.find(site => matchesSite(url, site));
}

// Timer interval reference
let timerInterval = null;

// Start timer for active site
async function startTimer(site, tabId) {
  // Clear existing timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  await StorageHelper.setActiveTab({
    siteId: site.id,
    tabId: tabId,
    startTime: Date.now()
  });
  
  // Decrement time every second
  timerInterval = setInterval(async () => {
    const activeTab = await StorageHelper.getActiveTab();
    if (!activeTab || activeTab.siteId !== site.id) {
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    
    const currentSite = await StorageHelper.getSiteById(site.id);
    if (!currentSite) {
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    
    if (currentSite.timeRemaining > 0) {
      await StorageHelper.updateSite(site.id, {
        timeRemaining: currentSite.timeRemaining - 1
      });
      
      // Check if time ran out
      if (currentSite.timeRemaining - 1 <= 0) {
        await StorageHelper.updateSite(site.id, {
          isBlocked: true
        });
        clearInterval(timerInterval);
        timerInterval = null;
        
        // Redirect to blocked page
        if (activeTab.tabId) {
          redirectToBlockedPage(activeTab.tabId, site.id);
        }
      }
    }
  }, 1000);
}

// Stop timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  StorageHelper.clearActiveTab();
}

// Redirect to blocked page
function redirectToBlockedPage(tabId, siteId) {
  const blockedUrl = chrome.runtime.getURL(`blocked.html?siteId=${siteId}`);
  chrome.tabs.update(tabId, { url: blockedUrl });
}

// Check if current tab should be blocked
async function checkAndBlockTab(tabId, url) {
  if (!url) return;
  
  const site = await findMatchingSite(url);
  if (!site) {
    // Not a tracked site, stop any active timer
    const activeTab = await StorageHelper.getActiveTab();
    if (activeTab) {
      stopTimer();
    }
    return;
  }
  
  // Check if site is blocked
  if (site.isBlocked) {
    redirectToBlockedPage(tabId, site.id);
    return;
  }
  
  // Check if timer should start
  const activeTab = await StorageHelper.getActiveTab();
  if (!activeTab || activeTab.siteId !== site.id) {
    startTimer(site, tabId);
  }
}

// Listen to tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  checkAndBlockTab(activeInfo.tabId, tab.url);
});

// Listen to tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkAndBlockTab(tabId, changeInfo.url);
  }
});

// Listen to window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No window focused, stop timer
    stopTimer();
  } else {
    // Window focused, check active tab
    const tabs = await chrome.tabs.query({ active: true, windowId: windowId });
    if (tabs.length > 0) {
      checkAndBlockTab(tabs[0].id, tabs[0].url);
    }
  }
});

// Setup midnight alarm for daily reset
chrome.alarms.create('midnightReset', {
  when: getNextMidnight(),
  periodInMinutes: 24 * 60 // Repeat every 24 hours
});

// Get next midnight timestamp
function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

// Handle alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'midnightReset') {
    await resetAllSites();
  }
});

// Reset all sites at midnight
async function resetAllSites() {
  const sites = await StorageHelper.getSites();
  const updatedSites = sites.map(site => ({
    ...site,
    restartsUsed: 0,
    isBlocked: false,
    timeRemaining: site.timeout * 60,
    lastReset: Date.now()
  }));
  await StorageHelper.setSites(updatedSites);
  
  // Clear active tab state
  stopTimer();
}

// Listen for messages from popup or blocked page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'restartSite') {
    handleRestartSite(request.siteId).then(sendResponse);
    return true; // Keep message channel open for async response
  } else if (request.action === 'getSiteStatus') {
    handleGetSiteStatus(request.siteId).then(sendResponse);
    return true;
  }
});

// Handle restart site request
async function handleRestartSite(siteId) {
  const site = await StorageHelper.getSiteById(siteId);
  if (!site) {
    return { success: false, error: 'Site not found' };
  }
  
  if (site.restartsUsed >= 3) {
    return { success: false, error: 'No restarts remaining today' };
  }
  
  await StorageHelper.updateSite(siteId, {
    restartsUsed: site.restartsUsed + 1,
    timeRemaining: site.timeout * 60,
    isBlocked: false
  });
  
  return { success: true };
}

// Handle get site status request
async function handleGetSiteStatus(siteId) {
  const site = await StorageHelper.getSiteById(siteId);
  return { site };
}

// Initialize: check current active tab on extension load
chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
  if (tabs.length > 0) {
    checkAndBlockTab(tabs[0].id, tabs[0].url);
  }
});


