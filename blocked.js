// Blocked page logic
let currentSite = null;

// Encouraging messages to show when site is blocked
const encouragements = [
  "You've Got This! 💪",
  "Stay Focused! ⚡",
  "Back to Your Goals! 🎯",
  "Keep Going Strong! 🚀",
  "Protect Your Time! 🛡️",
  "Focus Mode Activated! 💎",
  "Your Future Self Will Thank You! 🌟",
  "Champions Don't Get Distracted! 🏆",
  "One Step Closer to Your Goals! 🎖️",
  "You're Stronger Than This! 💪",
  "Time to Shine! ✨",
  "Discipline Equals Freedom! 🦅",
  "Stay on Track! 🎯",
  "Don't Break the Chain! ⛓️",
  "Your Dreams Are Worth It! 💫"
];

document.addEventListener('DOMContentLoaded', async () => {
  // Set random encouraging message
  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
  document.getElementById('encouragementText').textContent = randomEncouragement;
  
  await loadSiteInfo();
  setupRestartButton();
  
  // Refresh site info every second
  setInterval(loadSiteInfo, 1000);
});

// Load site information from URL parameter
async function loadSiteInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get('siteId');
  
  if (!siteId) {
    document.getElementById('domainText').textContent = 'Error: No site specified';
    return;
  }
  
  // Get site info from background script
  const response = await chrome.runtime.sendMessage({
    action: 'getSiteStatus',
    siteId: siteId
  });
  
  if (!response.site) {
    document.getElementById('domainText').textContent = 'Error: Site not found';
    return;
  }
  
  currentSite = response.site;
  updateUI();
}

// Update UI with site information
function updateUI() {
  if (!currentSite) return;
  
  // Update domain
  const domainText = currentSite.path 
    ? `${currentSite.domain}${currentSite.path}`
    : currentSite.domain;
  document.getElementById('domainText').textContent = domainText;
  
  // Update time remaining
  const timeRemaining = formatTime(currentSite.timeRemaining);
  document.getElementById('timeRemaining').textContent = timeRemaining;
  
  // Update restarts used
  document.getElementById('restartsUsed').textContent = `${currentSite.restartsUsed}/3`;
  
  // Update restart button state
  const restartBtn = document.getElementById('restartBtn');
  const restartInfo = document.getElementById('restartInfo');
  
  if (currentSite.restartsUsed >= 3) {
    restartBtn.disabled = true;
    restartInfo.textContent = 'No restarts remaining today. Site will unblock at midnight.';
    restartInfo.className = 'restart-info error';
  } else {
    restartBtn.disabled = false;
    const restartsLeft = 3 - currentSite.restartsUsed;
    restartInfo.textContent = `You have ${restartsLeft} restart${restartsLeft !== 1 ? 's' : ''} remaining today.`;
    restartInfo.className = 'restart-info';
  }
}

// Format seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Setup restart button handler
function setupRestartButton() {
  const restartBtn = document.getElementById('restartBtn');
  const restartInfo = document.getElementById('restartInfo');
  
  restartBtn.addEventListener('click', async () => {
    if (!currentSite) return;
    
    restartBtn.disabled = true;
    restartBtn.textContent = 'Restarting...';
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'restartSite',
        siteId: currentSite.id
      });
      
      if (response.success) {
        restartInfo.textContent = 'Timer restarted! Redirecting...';
        restartInfo.className = 'restart-info success';
        
        // Wait a moment then close the tab or go back
        setTimeout(() => {
          window.close();
          // If window.close() doesn't work (e.g., not opened by script), go back
          setTimeout(() => {
            history.back();
          }, 100);
        }, 1000);
      } else {
        restartInfo.textContent = response.error || 'Failed to restart timer';
        restartInfo.className = 'restart-info error';
        restartBtn.disabled = false;
        restartBtn.textContent = 'Restart Timer';
      }
    } catch (error) {
      restartInfo.textContent = 'Error: ' + error.message;
      restartInfo.className = 'restart-info error';
      restartBtn.disabled = false;
      restartBtn.textContent = 'Restart Timer';
    }
  });
}


