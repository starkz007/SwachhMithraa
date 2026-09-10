import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DirectivesGazettes = () => {
  const { directives, publishDirective } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    publishDirective({ title, summary });
    setTitle('');
    setSummary('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">newspaper</span>
              Official Gazette Publisher
            </span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Municipal Directives & Gazette Notifications</h2>
          <p className="text-xs text-on-surface-variant">
            Legally binding municipal circulars, public notifications, and environmental bylaws
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">post_add</span>
          <span>Draft New Official Gazette</span>
        </button>
      </div>

      <div className="space-y-4">
        {directives.map((dir) => (
          <div key={dir.id} className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary">{dir.id}</span>
                <span className="text-outline">•</span>
                <span className="text-xs text-on-surface-variant">{dir.date}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {dir.status}
              </span>
            </div>

            <h3 className="text-base font-bold text-on-surface">{dir.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">{dir.summary}</p>
            <div className="text-[11px] text-outline font-medium">Issued By: {dir.issuedBy}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h4 className="text-base font-bold text-on-surface">Publish New Municipal Gazette</h4>
              <button type="button" onClick={() => setShowModal(false)} className="p-1 text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-on-surface mb-1">Gazette Title / Bylaw</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Revised Commercial Plastic Penalty Schedule..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border text-on-surface focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Regulatory Text & Mandate</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Official legal mandate details, applicable fines, enforcement dates..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface-container-low border text-on-surface focus:border-primary outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:bg-primary-deep"
                >
                  Publish & Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
