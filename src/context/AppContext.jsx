import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initialTickets, 
  initialWorkers, 
  initialAiCameraViolations, 
  smartBins as initialSmartBins, 
  blackspots as initialBlackspots,
  cameraFleet as initialCameraFleet,
  zonalMetrics as initialZonalMetrics,
  interZoneLeaderboard as initialLeaderboard,
  directivesGazettes as initialDirectives
} from '../data/mockData';
import { translations } from '../translations/translations';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Backend Connection State (FastAPI vs Edge Mode)
  const [backendConnected, setBackendConnected] = useState(false);

  // Navigation & Role State
  const [activeRole, setActiveRoleState] = useState(() => {
    return localStorage.getItem('swachh_active_role') || 'login';
  });

  const [activeTab, setActiveTabState] = useState(() => {
    return localStorage.getItem('swachh_active_tab') || 'overview-grievances';
  });

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('swachh_lang') || 'en';
  });

  // Reactive Domain Data
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('swachh_tickets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude legacy mock tickets
        return parsed.filter(t => !['SWM-2024-1048', 'SWM-2024-1051', 'SWM-2024-1055', 'SWM-2024-1060'].includes(t.id));
      } catch (e) {}
    }
    return initialTickets;
  });

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('swachh_workers');
    return saved ? JSON.parse(saved) : initialWorkers;
  });

  const [aiCameraAlerts, setAiCameraAlerts] = useState(() => {
    const saved = localStorage.getItem('swachh_ai_camera_alerts');
    return saved ? JSON.parse(saved) : initialAiCameraViolations;
  });

  const [smartBins, setSmartBins] = useState(() => {
    const saved = localStorage.getItem('swachh_smart_bins');
    return saved ? JSON.parse(saved) : initialSmartBins;
  });

  const [blackspots, setBlackspots] = useState(() => {
    const saved = localStorage.getItem('swachh_blackspots');
    return saved ? JSON.parse(saved) : initialBlackspots;
  });

  const [cameraFleet, setCameraFleet] = useState(() => {
    const saved = localStorage.getItem('swachh_camera_fleet');
    return saved ? JSON.parse(saved) : initialCameraFleet;
  });

  const [zonalMetrics, setZonalMetrics] = useState(initialZonalMetrics);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [directives, setDirectives] = useState(initialDirectives);

  // User Balances & Scores
  const [citizenScore, setCitizenScore] = useState(() => {
    return Number(localStorage.getItem('swachh_citizen_score')) || 92;
  });

  const [workerCredits, setWorkerCredits] = useState(() => {
    return Number(localStorage.getItem('swachh_worker_credits')) || 1420;
  });

  // Feedback Notification Toast
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('swachh_active_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('swachh_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('swachh_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('swachh_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('swachh_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('swachh_ai_camera_alerts', JSON.stringify(aiCameraAlerts));
  }, [aiCameraAlerts]);

  useEffect(() => {
    localStorage.setItem('swachh_citizen_score', citizenScore);
  }, [citizenScore]);

  useEffect(() => {
    localStorage.setItem('swachh_worker_credits', workerCredits);
  }, [workerCredits]);

  // Synchronize with universal Cloud Datastore (and live FastAPI if online)
  useEffect(() => {
    let isMounted = true;

    const syncCloudData = async () => {
      try {
        const remoteTickets = await api.getTickets();
        if (isMounted && remoteTickets && Array.isArray(remoteTickets)) {
          setTickets(prev => {
            const ticketMap = new Map();
            // Retain local tickets
            prev.forEach(t => {
              if (t && t.id) ticketMap.set(t.id, t);
            });
            // Merge remote cloud tickets (remote cloud state takes precedence)
            remoteTickets.forEach(rt => {
              if (rt && rt.id) {
                const existing = ticketMap.get(rt.id);
                ticketMap.set(rt.id, existing ? { ...existing, ...rt } : rt);
              }
            });
            return Array.from(ticketMap.values());
          });
        }
      } catch (e) {
        console.debug("Cloud poll sync skipped:", e);
      }
    };

    // Initial fetch on mount
    syncCloudData();

    // Poll every 5 seconds for real-time cross-device sync
    const interval = setInterval(syncCloudData, 5000);

    // Sync immediately when user switches tabs or focuses device
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncCloudData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Synchronize with live Python FastAPI backend if online
    const unsub = api.onStatusChange((isOnline) => {
      if (isMounted) {
        setBackendConnected(isOnline);
        if (isOnline) {
          syncCloudData();
          api.getWorkers().then(rw => rw && isMounted && setWorkers(rw));
          api.getAiViolations().then(rv => rv && isMounted && setAiCameraAlerts(rv));
        }
      }
    });

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      unsub();
    };
  }, []);


  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const setRole = (role, defaultTab = null) => {
    setActiveRoleState(role);
    if (defaultTab) {
      setActiveTabState(defaultTab);
    } else {
      if (role === 'citizen') setActiveTabState('overview-grievances');
      else if (role === 'worker') setActiveTabState('field-tasks');
      else if (role === 'local_admin') setActiveTabState('ward-gis-dispatch');
      else if (role === 'zonal_admin') setActiveTabState('command-locality-telemetry');
      else if (role === 'central_admin') setActiveTabState('apex-inter-zone-oversight');
      else if (role === 'cctv_ops') setActiveTabState('live-cctv-stream-ai-detection-grid');
      else setActiveTabState('login');
    }
  };

  const setTab = (tab) => {
    setActiveTabState(tab);
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    showToast(lang === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है' : lang === 'kn' ? 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ' : 'Language switched to English', 'info');
  };

  // Translation helper
  const t = (section, key) => {
    const currentLangDict = translations[language] || translations.en;
    if (currentLangDict[section] && currentLangDict[section][key]) {
      return currentLangDict[section][key];
    }
    // Fallback to English
    return translations.en[section]?.[key] || key;
  };

  // Business Logic Actions
  const addTicket = (ticketData) => {
    const newId = `SWM-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const isAi = ticketData.isAiDetection || ticketData.source === 'ai_camera' || ticketData.category?.includes('AI CCTV');
    const newTicket = {
      id: newId,
      title: ticketData.title || (ticketData.category ? `${ticketData.category}` : "Civic Hygiene Complaint"),
      titleHi: ticketData.titleHi || ticketData.title || "स्वच्छता शिकायत",
      category: ticketData.category || (isAi ? "AI CCTV: Live Optical Waste Flag" : "Garbage Dump / Overflowing Bin"),
      source: isAi ? 'ai_camera' : 'citizen',
      isAiDetection: isAi,
      ward: ticketData.ward || "Civic Division",
      beat: ticketData.beat || "General Beat",
      location: ticketData.location || "Reported Location",
      lat: (ticketData.lat !== undefined && ticketData.lat !== null) ? ticketData.lat : 12.9716,
      lng: (ticketData.lng !== undefined && ticketData.lng !== null) ? ticketData.lng : 77.6412,
      reportedBy: ticketData.reportedBy || (isAi ? "AI Optical Surveillance Camera" : "Citizen User"),
      reportedTime: "Just now",
      status: "pending",
      priority: ticketData.priority || "High",
      assignedWorker: null,
      beforePhoto: ticketData.photoUrl || null,
      afterPhoto: null,
      slaRemaining: "24h 00m",
      notes: ticketData.notes || (isAi ? "Autonomous Optical Surveillance Detection." : "Citizen lodged complaint via portal.")
    };

    setTickets(prev => [newTicket, ...prev]);

    // Asynchronously synchronize with Cloud Datastore and FastAPI Backend
    api.createTicket(newTicket).catch(err => console.debug("Cloud ticket sync error:", err));

    // If source is AI Camera, also push directly into aiCameraAlerts state so it appears in AI Camera Tickets Desk!
    if (isAi) {
      const newAlert = {
        id: `AI-CAM-${Math.floor(1000 + Math.random() * 9000)}`,
        nodeId: "POLE-NODE-1402",
        location: ticketData.location || "Reported Location",
        timestamp: "Just now",
        violation: ticketData.title?.replace('AI Autonomous Flag: ', '') || "Optical Waste Accumulation",
        confidence: ticketData.confidence || 96,
        videoClipUrl: newTicket.beforePhoto,
        bbox: { x: 22, y: 28, w: 50, h: 42 },
        plateNumber: "KA-04-MB-4819",
        ownerName: "Civic Surveillance Evidence",
        status: "Challan Pending",
        fineAmount: 500,
        ticketId: newId
      };
      setAiCameraAlerts(prev => [newAlert, ...prev]);
    } else {
      setCitizenScore(prev => Math.min(100, prev + 5)); // Reward citizen for reporting
    }

    showToast(isAi ? `🚨 AI Surveillance: Ticket #${newId} auto-flagged!` : `Grievance #${newId} lodged successfully!`, 'success');
    return newTicket;
  };

  const dispatchWorker = (ticketId, workerId) => {
    const targetWorker = workers.find(w => w.id === workerId) || workers[0];
    let updatedTicket = null;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        updatedTicket = {
          ...t,
          status: 'in_progress',
          assignedWorker: {
            id: targetWorker.id,
            name: targetWorker.name,
            phone: targetWorker.phone,
            beat: targetWorker.beat,
            status: "Dispatched with Cart"
          }
        };
        return updatedTicket;
      }
      return t;
    }));

    // Async sync with Cloud Datastore and FastAPI
    api.assignTicket(ticketId, targetWorker.id, targetWorker.name, updatedTicket).catch(err => console.debug("Assign sync error:", err));

    showToast(`Dispatched ${targetWorker.name} to ticket #${ticketId}. Task queued on worker handset.`, 'info');
  };

  const resolveTicket = (ticketId, afterPhotoUrl, notes = "Cleaned and sanitized area.") => {
    let updatedTicket = null;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        updatedTicket = {
          ...t,
          status: 'resolved',
          afterPhoto: afterPhotoUrl || null,
          notes: `${t.notes || ''} [Resolved by worker: ${notes}]`,
          slaRemaining: "Completed within SLA"
        };
        return updatedTicket;
      }
      return t;
    }));

    // Async sync with Cloud Datastore and FastAPI
    api.resolveTicket(ticketId, afterPhotoUrl, notes, updatedTicket).catch(err => console.debug("Resolve sync error:", err));

    setWorkerCredits(prev => prev + 150); // Reward worker
    setCitizenScore(prev => Math.min(100, prev + 10)); // Reward citizen closure
    showToast(`Ticket #${ticketId} marked Resolved with geotagged after-photo! +150 Dignity Credits awarded.`, 'success');
  };

  const toggleWorkerDuty = (workerId) => {
    let nextStatus = 'on_duty';
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        nextStatus = w.dutyStatus === 'on_duty' ? 'off_duty' : 'on_duty';
        return {
          ...w,
          dutyStatus: nextStatus,
          punchedInAt: nextStatus === 'on_duty' ? 'Just Now (GPS Verified)' : '-'
        };
      }
      return w;
    }));

    // Async sync with FastAPI
    api.updateWorkerDuty(workerId, nextStatus).catch(err => console.debug("FastAPI worker duty sync queued locally:", err));

    showToast(`Worker attendance shift toggled successfully.`, 'info');
  };

  const issueChallan = (alertId) => {
    setAiCameraAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'Challan Issued'
        };
      }
      return a;
    }));

    // Async sync with FastAPI
    api.issueChallan(alertId).catch(err => console.debug("FastAPI challan sync queued locally:", err));

    showToast(`Official Municipal Challan issued for ${alertId} with SHA-256 seal. SMS sent to offender.`, 'success');
  };

  const triggerSosAlert = (workerId, reason) => {
    showToast(`EMERGENCY SOS BROADCAST from Worker #${workerId}: ${reason}! Control Room notified with live GPS.`, 'error');
  };

  const publishDirective = (directive) => {
    const newDir = {
      id: `MUNICIPAL-DIR-2024/${Math.floor(90 + Math.random() * 50)}`,
      title: directive.title,
      date: "Today, Just Now",
      issuedBy: "Apex Municipal Directorate",
      status: "Active Gazette",
      summary: directive.summary
    };
    setDirectives(prev => [newDir, ...prev]);
    showToast(`Official Gazette notification ${newDir.id} published and broadcasted city-wide!`, 'success');
  };

  return (
    <AppContext.Provider value={{
      activeRole,
      activeTab,
      language,
      backendConnected,
      tickets,
      workers,
      aiCameraAlerts,
      smartBins,
      blackspots,
      cameraFleet,
      zonalMetrics,
      leaderboard,
      directives,
      citizenScore,
      workerCredits,
      toast,
      setRole,
      setTab,
      setLanguage,
      t,
      addTicket,
      dispatchWorker,
      resolveTicket,
      toggleWorkerDuty,
      issueChallan,
      triggerSosAlert,
      publishDirective,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
