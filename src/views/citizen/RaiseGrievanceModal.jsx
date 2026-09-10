import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const RaiseGrievanceModal = ({ isOpen, onClose }) => {
  const { addTicket } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Garbage Dump / Overflowing Bin');
  const [location, setLocation] = useState('12th Cross Park, Indiranagar 2nd Stage');
  const [priority, setPriority] = useState('High');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80');

  if (!isOpen) return null;

  const categories = [
    "Garbage Dump / Overflowing Bin",
    "Illegal Debris / Malba",
    "Dead Animal Carcass Removal",
    "Drain Chokage / Stagnant Sludge",
    "Public Urination / Open Defecation",
    "Littering in Commercial Market"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addTicket({
      title: title || `${category} reported at ${location.split(',')[0]}`,
      category,
      location,
      priority,
      notes,
      photoUrl: photoPreview
    });
    onClose();
  };

  const simulatePhotoUpload = () => {
    const samples = [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618060932014-4deda4932554?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    setPhotoPreview(picked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">report</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Raise Civic Grievance</h3>
              <p className="text-xs text-on-surface-variant">Lodge a photo-verified sanitation complaint</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-outline hover:text-on-surface">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-on-surface mb-1">Issue Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-medium text-on-surface focus:border-primary outline-none"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-1">Location & Nearest Landmark</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-base">location_on</span>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-1">Photo Evidence (Live Geotagged)</label>
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant/40 bg-surface-container-low h-40 flex items-center justify-center group">
              {photoPreview ? (
                <img src={photoPreview} alt="Evidence preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-outline">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  <div>Click to capture or upload photo</div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={simulatePhotoUpload}
                  className="px-3 py-1.5 rounded-full bg-white text-black font-bold text-[11px] shadow-md flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <span>Capture / New Photo</span>
                </button>
              </div>
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] backdrop-blur-xs">
                GPS: 12.9716° N, 77.6412° E
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-on-surface mb-1">Urgency Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-medium text-on-surface focus:border-primary outline-none"
              >
                <option value="Critical">Critical (Immediate Hazard)</option>
                <option value="High">High (&lt; 6 Hours)</option>
                <option value="Medium">Medium (&lt; 24 Hours)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">Ward Jurisdiction</label>
              <input
                type="text"
                disabled
                value="Ward 14 • Indiranagar Beat #4"
                className="w-full h-10 px-3 rounded-xl bg-surface-container text-on-surface-variant font-medium border border-outline-variant/30 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-on-surface mb-1">Additional Observations / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Near the children swings, plastic garbage blowing onto street..."
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:bg-primary-deep flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Submit Grievance to Municipal Control</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
