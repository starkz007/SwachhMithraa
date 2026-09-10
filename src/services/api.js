/**
 * SwachhMitra Dual-Mode Hybrid API Client
 * 
 * Automatically connects to the live Python FastAPI backend when available,
 * and seamlessly falls back to an autonomous in-browser database when deployed
 * to static hosts like GitHub Pages.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

class ApiService {
  constructor() {
    this.isBackendOnline = false;
    this.statusListeners = [];
    this.hasChecked = false;
    this.checkHealth();
  }

  // Subscribe to backend connectivity status changes
  onStatusChange(callback) {
    this.statusListeners.push(callback);
    callback(this.isBackendOnline);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    this.statusListeners.forEach(cb => cb(this.isBackendOnline));
  }

  // Probe FastAPI health endpoint
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(`${API_BASE_URL}/api/health`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const wasOnline = this.isBackendOnline;
      this.isBackendOnline = res.ok;
      this.hasChecked = true;

      if (wasOnline !== this.isBackendOnline) {
        this.notifyListeners();
      }
      return this.isBackendOnline;
    } catch (err) {
      const wasOnline = this.isBackendOnline;
      this.isBackendOnline = false;
      this.hasChecked = true;
      if (wasOnline !== this.isBackendOnline) {
        this.notifyListeners();
      }
      return false;
    }
  }

  // 1. TICKETS API
  async getTickets(status = null, source = null) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const params = new URLSearchParams();
        if (status && status !== 'all') params.append('status', status);
        if (source && source !== 'all') params.append('source', source);

        const res = await fetch(`${API_BASE_URL}/api/tickets?${params.toString()}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('API error, falling back to local storage:', e);
      }
    }
    // Fallback: Return from localStorage
    const local = localStorage.getItem('swachh_tickets');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    return null;
  }

  async createTicket(ticketData) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tickets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ticketData)
        });
        if (res.ok) {
          const created = await res.json();
          return { success: true, ticket: created, mode: 'backend' };
        }
      } catch (e) {
        console.warn('Backend ticket creation error, using edge storage:', e);
      }
    }
    // Fallback mode
    return { success: true, ticket: ticketData, mode: 'edge' };
  }

  async assignTicket(ticketId, workerId, workerName) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/assign`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workerId, workerName })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Assign worker API error:', e);
      }
    }
    return null;
  }

  async resolveTicket(ticketId, afterPhoto) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/resolve`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ afterPhoto })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Resolve ticket API error:', e);
      }
    }
    return null;
  }

  // 2. WORKERS API
  async getWorkers() {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/workers`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Fetch workers API error:', e);
      }
    }
    const local = localStorage.getItem('swachh_workers');
    if (local) {
      try { return JSON.parse(local); } catch (e) {}
    }
    return null;
  }

  async updateWorkerDuty(workerId, duty) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/workers/${workerId}/duty`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ duty })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    return null;
  }

  // 3. AI VIOLATIONS API
  async getAiViolations() {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/surveillance/alerts`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    const local = localStorage.getItem('swachh_ai_camera_alerts');
    if (local) {
      try { return JSON.parse(local); } catch (e) {}
    }
    return null;
  }

  async issueChallan(violationId) {
    const isOnline = await this.checkHealth();
    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/surveillance/alerts/${violationId}/challan`, {
          method: 'PUT'
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    return null;
  }
}

export const api = new ApiService();
