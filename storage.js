// Storage utility functions for managing blocked sites data

const StorageHelper = {
  // Get all sites from storage
  async getSites() {
    const result = await chrome.storage.local.get(['sites']);
    return result.sites || [];
  },

  // Save sites to storage
  async setSites(sites) {
    await chrome.storage.local.set({ sites });
  },

  // Add a new site
  async addSite(domain, path, timeoutMinutes) {
    const sites = await this.getSites();
    const newSite = {
      id: `site_${Date.now()}`,
      domain: domain.toLowerCase().trim(),
      path: path ? path.trim() : '',
      timeout: timeoutMinutes,
      timeRemaining: timeoutMinutes * 60, // Convert to seconds
      restartsUsed: 0,
      isBlocked: false,
      lastReset: Date.now()
    };
    sites.push(newSite);
    await this.setSites(sites);
    return newSite;
  },

  // Update a site
  async updateSite(siteId, updates) {
    const sites = await this.getSites();
    const index = sites.findIndex(s => s.id === siteId);
    if (index !== -1) {
      sites[index] = { ...sites[index], ...updates };
      await this.setSites(sites);
      return sites[index];
    }
    return null;
  },

  // Delete a site
  async deleteSite(siteId) {
    const sites = await this.getSites();
    const filtered = sites.filter(s => s.id !== siteId);
    await this.setSites(filtered);
  },

  // Get a site by ID
  async getSiteById(siteId) {
    const sites = await this.getSites();
    return sites.find(s => s.id === siteId);
  },

  // Get active tab state
  async getActiveTab() {
    const result = await chrome.storage.local.get(['activeTab']);
    return result.activeTab || null;
  },

  // Set active tab state
  async setActiveTab(activeTab) {
    await chrome.storage.local.set({ activeTab });
  },

  // Clear active tab state
  async clearActiveTab() {
    await chrome.storage.local.remove(['activeTab']);
  }
};

// Make available to other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageHelper;
}


