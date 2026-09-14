import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PastComplaints = () => {
  const { tickets, refreshTickets, showToast } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'in_progress' | 'resolved' | 'pending'
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rating, setRating] = useState(5);

  const filtered = tickets.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const submitRating = (ticketId) => {
    showToast(`Thank you! Rated 5 Stars for Ticket #${ticketId}. Worker Sunil V. awarded performance bonus points.`, 'success');
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface">My Past Complaints & Grievance History</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Full audit trail of your filed complaints, before/after photo verifications, and SLA timelines
          </p>
        </div>

        {/* Filter Pills & Sync Button */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={refreshTickets}
            className="px-3.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Check latest status from municipal cloud"
          >
            <span className="material-symbols-outlined text-sm">sync</span>
            <span>Refresh</span>
          </button>

          <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              All ({tickets.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('in_progress')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'in_progress' ? 'bg-tertiary text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => setFilter('resolved')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'resolved' ? 'bg-emerald-700 text-white' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-surface-container-lowest border border-outline-variant/30 space-y-3">
          <span className="material-symbols-outlined text-5xl text-outline">inbox</span>
          <h3 className="text-base font-bold text-on-surface">No Complaints Found</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            {filter === 'all'
              ? 'No civic grievances have been recorded on this device yet. Click "Raise Grievance" above to submit a live complaint.'
              : `No grievances currently in "${filter.replace('_', ' ')}" status.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((ticket) => {
            const isResolved = ticket.status === 'resolved';
            const isInProgress = ticket.status === 'in_progress';

            return (
              <div
                key={ticket.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-primary">{ticket.id}</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-surface-variant">{ticket.reportedTime}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isResolved ? 'bg-emerald-100 text-emerald-800' :
                    isInProgress ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                  }`}>
                    {isResolved ? 'Resolved' : isInProgress ? 'In Progress' : 'Pending Dispatch'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-[11px] font-medium text-outline">
                    {ticket.priority} Priority
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-on-surface">{ticket.title}</h3>
                <p className="text-xs text-on-surface-variant flex items-center gap-1.5 flex-wrap">
                  <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                  <span>{ticket.location}</span>
                  {ticket.lat && ticket.lng && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                      {ticket.lat.toFixed(4)}° N, {ticket.lng.toFixed(4)}° E
                    </span>
                  )}
                </p>

                {ticket.assignedWorker && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-surface-container-low text-xs text-on-surface">
                    <span className="material-symbols-outlined text-sm text-tertiary">person</span>
                    <span>Assigned Beat Staff: <strong>{ticket.assignedWorker.name}</strong> ({ticket.assignedWorker.beat})</span>
                  </div>
                )}
              </div>

              {/* Photos & Action */}
              <div className="flex items-center gap-3 shrink-0">
                {ticket.beforePhoto && (
                  <div className="text-center">
                    <img
                      src={ticket.beforePhoto}
                      alt="Before"
                      className="w-16 h-16 rounded-xl object-cover border border-outline-variant/40 shadow-xs"
                    />
                    <span className="text-[10px] text-outline font-bold">Reported</span>
                  </div>
                )}

                {ticket.afterPhoto && (
                  <div className="text-center">
                    <img
                      src={ticket.afterPhoto}
                      alt="After"
                      className="w-16 h-16 rounded-xl object-cover border border-emerald-400 shadow-xs"
                    />
                    <span className="text-[10px] text-emerald-700 font-bold">Cleaned</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedTicket(ticket)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors"
                >
                  View Details & SLA
                </button>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <span className="text-xs font-mono font-bold text-primary">{selectedTicket.id}</span>
                <h3 className="text-lg font-bold text-on-surface">{selectedTicket.title}</h3>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                  <span>{selectedTicket.location}</span>
                </p>
                {selectedTicket.lat && selectedTicket.lng && (
                  <p className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-bold mt-0.5">
                    GPS Coordinates: {selectedTicket.lat.toFixed(4)}° N, {selectedTicket.lng.toFixed(4)}° E (Ward 14)
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* SLA Step Progress */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-on-surface">Resolution Progress & SLA Timeline</div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                  <div>
                    <strong className="text-on-surface">Complaint Registered with Geotag</strong>
                    <p className="text-[11px] text-outline">Logged at {selectedTicket.reportedTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${selectedTicket.assignedWorker ? 'bg-emerald-600 text-white' : 'bg-outline-variant text-white'}`}>
                    {selectedTicket.assignedWorker ? '✓' : '2'}
                  </span>
                  <div>
                    <strong className="text-on-surface">AI Beat Auto-Dispatch to Field Crew</strong>
                    <p className="text-[11px] text-outline">{selectedTicket.assignedWorker ? `Allocated to ${selectedTicket.assignedWorker.name}` : 'Pending assignment'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${selectedTicket.status === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-outline-variant text-white'}`}>
                    {selectedTicket.status === 'resolved' ? '✓' : '3'}
                  </span>
                  <div>
                    <strong className="text-on-surface">Area Sanitization & Photo Verification</strong>
                    <p className="text-[11px] text-outline">{selectedTicket.status === 'resolved' ? 'Confirmed by Municipal Field Inspector' : 'In Progress with sanitization crew'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before vs After Photos */}
            <div>
              <div className="text-xs font-bold text-on-surface mb-2">Visual Evidence Inspection</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-outline uppercase">Before (Citizen Lodged)</div>
                  {selectedTicket.beforePhoto ? (
                    <img src={selectedTicket.beforePhoto} alt="Before" className="w-full h-36 rounded-xl object-cover border" />
                  ) : (
                    <div className="w-full h-36 rounded-xl bg-surface-container flex flex-col items-center justify-center text-outline text-xs p-3 text-center">
                      <span className="material-symbols-outlined text-2xl mb-1">no_photography</span>
                      <span>No Photo Attached</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase">After (Crew Resolved)</div>
                  {selectedTicket.afterPhoto ? (
                    <img src={selectedTicket.afterPhoto} alt="After" className="w-full h-36 rounded-xl object-cover border border-emerald-400" />
                  ) : (
                    <div className="w-full h-36 rounded-xl bg-surface-container flex items-center justify-center text-outline text-xs">
                      Resolution Photo Pending
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rate Resolution */}
            {selectedTicket.status === 'resolved' && (
              <div className="p-4 rounded-2xl bg-primary-fixed/20 border border-primary/20 space-y-2 text-center">
                <div className="text-xs font-bold text-primary">Rate Sanitation Quality</div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="text-amber-500 material-symbols-outlined text-2xl"
                    >
                      {s <= rating ? 'star' : 'star_border'}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => submitRating(selectedTicket.id)}
                  className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-sm"
                >
                  Submit 5-Star Feedback (+10 Civic Pts)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
