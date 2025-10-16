// Popup UI logic
document.addEventListener('DOMContentLoaded', async () => {
  await loadSites();
  setupFormHandler();
  
  // Refresh sites list every second to show updated timers
  setInterval(loadSites, 1000);
});

// Load and display all sites
async function loadSites() {
  const sites = await StorageHelper.getSites();
  const sitesList = document.getElementById('sitesList');
  const emptyState = document.getElementById('emptyState');
  
  if (sites.length === 0) {
    sitesList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  sitesList.innerHTML = sites.map(site => createSiteCard(site)).join('');
  
  // Attach delete handlers
  sites.forEach(site => {
    const deleteBtn = document.querySelector(`[data-site-id="${site.id}"]`);
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => deleteSite(site.id));
    }
  });
}

// Create HTML for a site card
function createSiteCard(site) {
  const timeRemainingFormatted = formatTime(site.timeRemaining);
  const totalTimeFormatted = formatTime(site.timeout * 60);
  const restartsRemaining = 3 - site.restartsUsed;
  
  let cardClass = 'site-card';
  let statusBadge = '';
  let statusIcon = '';
  
  if (site.isBlocked) {
    cardClass += ' blocked';
    statusBadge = '<span class="status-badge blocked"><i class="bi bi-shield-fill-x"></i> Blocked</span>';
    statusIcon = 'bi-shield-fill-x';
  } else if (site.timeRemaining < site.timeout * 60) {
    cardClass += ' active';
    statusBadge = '<span class="status-badge active"><i class="bi bi-hourglass-split"></i> Active</span>';
    statusIcon = 'bi-hourglass-split';
  }
  
  let restartsClass = 'ok';
  if (restartsRemaining === 0) {
    restartsClass = 'blocked';
  } else if (restartsRemaining === 1) {
    restartsClass = 'warning';
  }
  
  let timeClass = 'ok';
  if (site.isBlocked) {
    timeClass = 'blocked';
  } else if (site.timeRemaining < site.timeout * 30) {
    timeClass = 'warning';
  }
  
  return `
    <div class="${cardClass}">
      <div class="site-header">
        <div class="site-info">
          <div class="site-domain"><i class="bi bi-globe2"></i> ${escapeHtml(site.domain)}</div>
          ${site.path ? `<div class="site-path"><i class="bi bi-folder"></i> ${escapeHtml(site.path)}</div>` : ''}
        </div>
        ${statusBadge}
        <button class="delete-btn" data-site-id="${site.id}" title="Delete site"><i class="bi bi-trash"></i></button>
      </div>
      <div class="site-stats">
        <div class="stat">
          <i class="bi bi-clock stat-icon"></i>
          <span class="stat-label">Time:</span>
          <span class="stat-value ${timeClass}">${timeRemainingFormatted}</span>
          <span class="stat-label">/ ${totalTimeFormatted}</span>
        </div>
        <div class="stat">
          <i class="bi bi-arrow-repeat stat-icon"></i>
          <span class="stat-label">Restarts:</span>
          <span class="stat-value ${restartsClass}">${restartsRemaining}/3</span>
        </div>
      </div>
    </div>
  `;
}

// Format seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Setup form submission handler
function setupFormHandler() {
  const form = document.getElementById('addSiteForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const domain = document.getElementById('domain').value.trim();
    const path = document.getElementById('path').value.trim();
    const timeout = parseInt(document.getElementById('timeout').value);
    
    if (!domain || timeout < 1) {
      alert('Please enter a valid domain and timeout');
      return;
    }
    
    // Clean domain (remove protocol, www, trailing slashes)
    let cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
    
    // Clean path (ensure it starts with / if provided)
    let cleanPath = path;
    if (cleanPath && !cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    
    await StorageHelper.addSite(cleanDomain, cleanPath, timeout);
    
    // Reset form
    form.reset();
    document.getElementById('timeout').value = '30';
    
    // Reload sites list
    await loadSites();
  });
}

// Delete a site
async function deleteSite(siteId) {
  if (confirm('Are you sure you want to delete this site?')) {
    await StorageHelper.deleteSite(siteId);
    await loadSites();
  }
}


