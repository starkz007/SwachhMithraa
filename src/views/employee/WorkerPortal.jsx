import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../../components/common/InteractiveMap';
import { compressImageToFit } from '../../utils/imageUtils';

export const WorkerPortal = () => {
  const { activeTab, setTab, workers, tickets, resolveTicket, toggleWorkerDuty, workerCredits, triggerSosAlert, showToast } = useApp();
  const worker = workers[0]; // Sunil V.
  const [selectedTask, setSelectedTask] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('Sanitized area and disposed waste at designated transfer bay.');
  const [resolutionPhoto, setResolutionPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleWorkerPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await compressImageToFit(file);
      if (optimized) {
        setResolutionPhoto(optimized);
        if (showToast) showToast('Clean-up verification photo attached!', 'success');
      }
    } catch (err) {
      console.warn("Worker photo error:", err);
    }
  };

  // Filter tasks assigned to this worker or in this beat
  const myTasks = tickets.filter(t => t.assignedWorker?.id === worker.id || (t.status === 'pending' && t.beat === 'Beat #4'));

  const handlePunchToggle = () => {
    toggleWorkerDuty(worker.id);
  };

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;
    resolveTicket(selectedTask.id, resolutionPhoto, resolutionNotes);
    setSelectedTask(null);
  };

  const handleSos = () => {
    triggerSosAlert(worker.id, "Medical emergency / aggressive stray animal on Beat #4");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pb-20">
      {/* Top Banner with Attendance & SOS */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-2xl">cleaning_services</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-on-surface">Sunil V. (Lead Sanitary Staff)</h1>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${worker.dutyStatus === 'on_duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {worker.dutyStatus === 'on_duty' ? 'ON DUTY • GPS ACTIVE' : 'OFF DUTY'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                ID: WKR-104 • Beat #4 (Indiranagar 12th Main) • Shift: 06:30 AM - 02:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePunchToggle}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${worker.dutyStatus === 'on_duty' ? 'bg-surface-container text-on-surface hover:bg-surface-container-high' : 'bg-primary text-on-primary hover:bg-primary-deep'}`}
            >
              <span className="material-symbols-outlined text-base">
                {worker.dutyStatus === 'on_duty' ? 'timer_off' : 'timer'}
              </span>
              <span>{worker.dutyStatus === 'on_duty' ? 'Clock-Out Shift' : 'Punch-In with GPS'}</span>
            </button>

            <button
              type="button"
              onClick={handleSos}
              className="px-4 py-2.5 rounded-full bg-error text-on-error text-xs font-bold shadow-md hover:bg-red-800 flex items-center gap-1.5 animate-pulse"
              title="Broadcast Emergency SOS with live GPS to Zonal Control Room"
            >
              <span className="material-symbols-outlined text-base">emergency</span>
              <span>Emergency SOS</span>
            </button>
          </div>
        </div>

        {/* Worker Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-outline-variant/20">
          <nav className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab('field-tasks')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'field-tasks' || !activeTab ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">cleaning_services</span>
              <span>Field Tasks & Action Queue ({myTasks.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('beat-route')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'beat-route' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">route</span>
              <span>Beat GPS Navigation</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('credits-wallet')}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'credits-wallet' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-base">wallet</span>
              <span>Dignity Welfare Wallet ({workerCredits} Pts)</span>
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Assigned Beat Tasks</span>
            <div className="text-2xl font-black text-on-surface mt-1">{myTasks.length} Action Items</div>
            <div className="text-xs text-tertiary font-medium mt-0.5">Indiranagar Sector 2</div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Completed Today</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{worker.tasksCompletedToday} Resolved</div>
            <div className="text-xs text-emerald-600 font-medium mt-0.5">Average SLA: 18 mins</div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Dignity Welfare Wallet</span>
            <div className="text-2xl font-black text-primary mt-1">🪙 {workerCredits} Pts</div>
            <div className="text-xs text-primary font-medium mt-0.5">Redeemable for grocery & health benefits</div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Performance Rating</span>
            <div className="text-2xl font-black text-amber-500 mt-1">⭐ {worker.rating} / 5.0</div>
            <div className="text-xs text-on-surface-variant font-medium mt-0.5">Top 5% Sanitary Staff in Zone</div>
          </div>
        </div>

        {/* Beat GIS Navigation Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">route</span>
              <span>Today's Beat Route & Scheduled Cleanup Stops</span>
            </h2>
            <span className="text-xs text-outline">Pulsing blue marker shows your live location</span>
          </div>
          <InteractiveMap height="360px" />
        </div>

        {/* Assigned Tasks List */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">assignment</span>
            <span>Task Queue & Citizen Reports</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTasks.map((task) => {
              const isResolved = task.status === 'resolved';

              return (
                <div
                  key={task.id}
                  className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">{task.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isResolved ? 'Completed' : 'Action Required'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-on-surface">{task.title}</h3>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-tertiary">location_on</span>
                      <span>{task.location}</span>
                    </p>
                    <p className="text-xs text-outline bg-surface-container-low p-2.5 rounded-xl">
                      {task.notes}
                    </p>
                  </div>

                  {/* Task Actions */}
                  <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-outline">
                      Reported by: {task.reportedBy}
                    </div>

                    {!isResolved ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTask(task)}
                        className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep flex items-center gap-1 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">photo_camera</span>
                        <span>Resolve & Upload Proof</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Resolution Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Task Resolution Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <span className="text-xs font-mono font-bold text-tertiary">{selectedTask.id}</span>
                <h3 className="text-base font-bold text-on-surface">Submit Cleanup Verification Proof</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="p-1 rounded-full text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-outline mb-1">Before Condition</label>
                  {selectedTask.beforePhoto ? (
                    <img src={selectedTask.beforePhoto} alt="Before" className="w-full h-32 rounded-xl object-cover border border-outline-variant/30" />
                  ) : (
                    <div className="w-full h-32 rounded-xl bg-surface-container flex flex-col items-center justify-center text-outline text-center p-2">
                      <span className="material-symbols-outlined text-2xl mb-1">no_photography</span>
                      <span className="text-[11px] font-semibold">No Photo Attached</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-emerald-700 mb-1">After Clean-Up Photo</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    capture="environment"
                    onChange={handleWorkerPhotoUpload}
                    className="hidden"
                  />
                  {resolutionPhoto ? (
                    <div className="relative rounded-xl overflow-hidden h-32 border border-emerald-400 group">
                      <img src={resolutionPhoto} alt="After resolution" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] font-bold transition-opacity"
                      >
                        Change Photo
                      </button>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white font-mono">
                        GPS Tagged
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 rounded-xl border-2 border-dashed border-emerald-500/50 hover:border-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 flex flex-col items-center justify-center text-emerald-800 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-2xl mb-1">add_a_photo</span>
                      <span className="text-xs font-bold">Snap / Upload Proof</span>
                      <span className="text-[10px] text-emerald-600">Camera or Gallery</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Field Action Log / Sanitary Measures</label>
                <textarea
                  rows={3}
                  required
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-tertiary-fixed/20 border border-tertiary/20 text-tertiary font-semibold flex items-center justify-between">
                <span>Welfare Reward on Completion:</span>
                <span className="font-bold">+150 Dignity Credits</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold shadow-md hover:bg-emerald-800 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">task_alt</span>
                  <span>Confirm Clean-Up & Close Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
