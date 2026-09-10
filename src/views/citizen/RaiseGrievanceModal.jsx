import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const RaiseGrievanceModal = ({ isOpen, onClose }) => {
  const { addTicket, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Garbage Dump / Overflowing Bin');
  const [location, setLocation] = useState('12th Cross Rd, near Children Play Area, Indiranagar 2nd Stage, Bengaluru 560038');
  const [priority, setPriority] = useState('High');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80');
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      if (showToast) showToast('File too large (max 10MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
      if (showToast) showToast('Custom photo uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
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
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-on-surface">Location & Street Address (Bengaluru)</label>
              <span className="text-[11px] text-primary font-mono font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-500">my_location</span>
                GPS: 12.9716° N, 77.6412° E
              </span>
            </div>

            <div className="relative flex items-center mb-2">
              <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-base">location_on</span>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter exact street, door no., or landmark in Ward 14"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none text-xs"
              />
            </div>

            {/* Quick Landmark Picker Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-outline">
              <span className="shrink-0 font-semibold text-[10px] uppercase text-on-surface-variant">Quick Select:</span>
              <button
                type="button"
                onClick={() => setLocation("12th Cross Rd, near Children Play Area, Indiranagar 2nd Stage, Bengaluru 560038")}
                className="px-2.5 py-0.5 rounded-lg bg-surface-container-high hover:bg-primary/15 hover:text-primary whitespace-nowrap text-[11px] transition-colors"
              >
                12th Cross Park
              </button>
              <button
                type="button"
                onClick={() => setLocation("100 Feet Rd, Opposite BDA Complex Arcade, HAL 2nd Stage, Bengaluru 560038")}
                className="px-2.5 py-0.5 rounded-lg bg-surface-container-high hover:bg-primary/15 hover:text-primary whitespace-nowrap text-[11px] transition-colors"
              >
                100ft Rd BDA Complex
              </button>
              <button
                type="button"
                onClick={() => setLocation("Chinmaya Mission Hospital Rd, Metro Pillar #62, Indiranagar, Bengaluru 560038")}
                className="px-2.5 py-0.5 rounded-lg bg-surface-container-high hover:bg-primary/15 hover:text-primary whitespace-nowrap text-[11px] transition-colors"
              >
                CMH Metro Station
              </button>
              <button
                type="button"
                onClick={() => setLocation("80 Feet Rd & 7th Main Corner, HAL 3rd Stage, Indiranagar, Bengaluru 560075")}
                className="px-2.5 py-0.5 rounded-lg bg-surface-container-high hover:bg-primary/15 hover:text-primary whitespace-nowrap text-[11px] transition-colors"
              >
                80ft Road 7th Main
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-on-surface">Photo Evidence (Upload Your Photo)</label>
              <span className="text-[10px] text-primary font-bold">JPG / PNG / WEBP</span>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative rounded-2xl overflow-hidden border-2 border-dashed border-outline-variant/60 hover:border-primary cursor-pointer bg-surface-container-low h-44 flex flex-col items-center justify-center group transition-colors"
            >
              {photoPreview ? (
                <>
                  <img src={photoPreview} alt="Evidence preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <span className="material-symbols-outlined text-2xl">file_upload</span>
                    <span className="text-xs font-bold">Click to Upload Different Photo</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-outline p-4">
                  <span className="material-symbols-outlined text-4xl mb-1 text-primary">cloud_upload</span>
                  <div className="text-xs font-bold text-on-surface">Click to Upload Your Own Photo</div>
                  <div className="text-[10px] text-outline mt-0.5">Supports Camera capture or local file from device</div>
                </div>
              )}

              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px] backdrop-blur-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-400">my_location</span>
                GPS: 12.9716° N, 77.6412° E
              </span>

              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-medium backdrop-blur-xs">
                Tap to replace
              </span>
            </div>

            {/* Quick Action Buttons for Photo */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-base">upload_file</span>
                <span>Choose From My Device</span>
              </button>

              <button
                type="button"
                onClick={simulatePhotoUpload}
                title="Cycle sample test pictures"
                className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-base">shuffle</span>
                <span>Try Sample</span>
              </button>
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
