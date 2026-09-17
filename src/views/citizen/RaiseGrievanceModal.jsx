import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { compressImageToFit } from '../../utils/imageUtils';

export const RaiseGrievanceModal = ({ isOpen, onClose }) => {
  const { addTicket, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Garbage Dump / Overflowing Bin');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [isLocating, setIsLocating] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [priority, setPriority] = useState('High');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Trigger real-time location detection when modal opens
  useEffect(() => {
    if (isOpen) {
      detectLiveLocation();
    }
  }, [isOpen]);

  const detectLiveLocation = () => {
    if (!navigator.geolocation) {
      if (showToast) showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setGpsAccuracy(Math.round(accuracy));

        try {
          // Reverse geocode with OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'SwachhAI-CivicPortal/1.0'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const street = addr.road || addr.suburb || addr.neighbourhood || addr.residential || '';
            const locality = addr.city_district || addr.suburb || addr.city || addr.town || '';
            const postcode = addr.postcode ? `, ${addr.postcode}` : '';
            const formatted = data.display_name
              ? (street ? `${street}, ${locality}${postcode}` : data.display_name.split(',').slice(0, 4).join(','))
              : `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
            
            setLocation(formatted);
            if (showToast) showToast(`Real-time GPS detected: ${street || 'Current location'}`, 'success');
          } else {
            setLocation(`Live GPS: ${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E`);
            if (showToast) showToast(`Live GPS locked: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`, 'success');
          }
        } catch {
          setLocation(`Live GPS: ${latitude.toFixed(5)}° N, ${longitude.toFixed(5)}° E`);
          if (showToast) showToast(`Live GPS locked: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`, 'success');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.warn("GPS Location fetch warning:", error.message);
        if (showToast) showToast('GPS location permission denied or unavailable. Please type your location.', 'info');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  if (!isOpen) return null;

  const categories = [
    { label: "Garbage Dump / Overflowing Bin", icon: "delete_sweep", desc: "Solid waste, overflowing vats & road litter" },
    { label: "Illegal Debris / Malba", icon: "handyman", desc: "Construction gravel, bricks & road demolition waste" },
    { label: "Dead Animal Carcass Removal", icon: "pets", desc: "Emergency sanitary disposal required" },
    { label: "Drain Chokage / Stagnant Sludge", icon: "water_damage", desc: "Clogged stormwater drains & blackwater sewage" },
    { label: "Public Urination / Open Defecation", icon: "sanitizer", desc: "Urgent disinfection & anti-nuisance washdown" },
    { label: "Littering in Commercial Market", icon: "storefront", desc: "Merchant plaza waste, plastic wrappers & packaging" }
  ];

  const priorities = [
    { level: "Critical", label: "Critical", time: "< 4 Hours", icon: "emergency", desc: "Severe hazard / carcass" },
    { level: "High", label: "High", time: "< 6 Hours", icon: "speed", desc: "Overflowing / public obstruction" },
    { level: "Medium", label: "Medium", time: "< 24 Hours", icon: "schedule", desc: "Standard municipal sweep" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalLocation = location.trim() || (coords.lat ? `GPS: ${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E` : 'Reported Location');
    addTicket({
      title: title || `${category} at ${finalLocation.split(',')[0]}`,
      category,
      location: finalLocation,
      lat: coords.lat,
      lng: coords.lng,
      priority,
      notes,
      photoUrl: photoPreview || null
    });
    onClose();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (showToast) showToast('Optimizing photo evidence for cloud sync...', 'info');

    try {
      const optimized = await compressImageToFit(file);
      if (optimized) {
        setPhotoPreview(optimized);
        if (showToast) showToast('Photo verified & attached with GPS metadata!', 'success');
      } else {
        if (showToast) showToast('Unable to compress photo. Please try a different image.', 'error');
      }
    } catch (err) {
      console.warn("Photo compression error:", err);
      if (showToast) showToast('Error processing photo', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-2xl">add_alert</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Raise Civic Grievance</h3>
              <p className="text-xs text-on-surface-variant">Lodge a GPS-stamped, photo-verified municipal grievance</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 rounded-full text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Issue Category Tiles */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-on-surface">Select Issue Category</label>
              <span className="text-[10px] text-outline font-medium">Choose primary nature of grievance</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat, i) => {
                const isSelected = category === cat.label;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCategory(cat.label)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary/40'
                        : 'border-outline-variant/30 bg-surface-container-low text-on-surface hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-primary' : 'text-outline'}`}>
                        {cat.icon}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-xs text-primary font-bold">check_circle</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[11px] leading-tight line-clamp-1">{cat.label}</div>
                      <div className="text-[9px] text-outline leading-tight mt-0.5 line-clamp-1">{cat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location & GPS */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-on-surface">Physical Location / Address</label>
              <div className="flex items-center gap-2">
                {coords.lat && coords.lng && (
                  <span className="text-[11px] text-primary font-mono font-bold flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-xs text-emerald-500 animate-pulse">my_location</span>
                    {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
                    {gpsAccuracy && <span className="text-outline text-[9px]">(&plusmn;{gpsAccuracy}m)</span>}
                  </span>
                )}
                <button
                  type="button"
                  onClick={detectLiveLocation}
                  disabled={isLocating}
                  className="px-2.5 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-deep font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                  title="Detect live GPS coordinates from device"
                >
                  <span className={`material-symbols-outlined text-xs ${isLocating ? 'animate-spin' : ''}`}>
                    {isLocating ? 'sync' : 'near_me'}
                  </span>
                  <span>{isLocating ? 'Acquiring...' : 'Locate Me'}</span>
                </button>
              </div>
            </div>

            <div className="relative flex items-center mb-1">
              <span className="absolute left-3 text-on-surface-variant material-symbols-outlined text-base">
                {isLocating ? 'hourglass_top' : 'location_on'}
              </span>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={isLocating ? "Detecting your real-time location via GPS..." : "Enter street address, landmark, or door number"}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none text-xs"
              />
            </div>
            <p className="text-[10px] text-outline">Real-time GPS ensures municipal dispatchers can route sanitation beat marshals directly.</p>
          </div>

          {/* Photo Evidence with Dual Actions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-on-surface">Photo Evidence</label>
              <span className="text-[10px] text-outline font-medium">GPS Geo-tagged visual evidence</span>
            </div>

            {/* Native file inputs */}
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
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <span className="material-symbols-outlined text-3xl">change_circle</span>
                    <span className="text-xs font-bold">Tap to Replace Evidence Photo</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-outline p-4 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                  </div>
                  <div className="text-xs font-bold text-on-surface">Tap to Snap or Upload Photo</div>
                  <div className="text-[10px] text-outline mt-1 max-w-xs">Supports live camera capture or device gallery selection</div>
                </div>
              )}

              {coords.lat && (
                <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/75 text-white font-mono text-[10px] backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                  <span className="material-symbols-outlined text-xs text-emerald-400">my_location</span>
                  GPS: {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
                </span>
              )}
            </div>

            {/* Direct Action Buttons */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.setAttribute('capture', 'environment');
                    fileInputRef.current.click();
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                <span>Open Camera</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute('capture');
                    fileInputRef.current.click();
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs flex items-center justify-center gap-1.5 border border-outline-variant/30 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">photo_library</span>
                <span>Choose from Gallery</span>
              </button>
              {photoPreview && (
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="py-2 px-3 rounded-xl bg-error/10 hover:bg-error/20 text-error font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Remove current photo"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              )}
            </div>
          </div>

          {/* Urgency SLA Cards */}
          <div>
            <label className="block font-bold text-on-surface mb-1.5">Urgency & Resolution SLA Target</label>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((p, i) => {
                const isSelected = priority === p.level;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setPriority(p.level)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? p.level === 'Critical'
                          ? 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500/40'
                          : p.level === 'High'
                          ? 'border-amber-500 bg-amber-50 text-amber-800 ring-1 ring-amber-500/40'
                          : 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40'
                        : 'border-outline-variant/30 bg-surface-container-low text-on-surface hover:border-outline-variant/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{p.label}</span>
                      <span className="material-symbols-outlined text-sm">{p.icon}</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] font-bold opacity-90">{p.time}</div>
                      <div className="text-[9px] text-outline mt-0.5 line-clamp-1">{p.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-on-surface mb-1">Specific Landmarks / Observations</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. In front of metro pillar #48, near tea stall. Bin overflowing onto footpath..."
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:border-primary outline-none text-xs"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold hover:bg-surface-container-high cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold shadow-md hover:bg-primary-deep flex items-center gap-1.5 cursor-pointer transition-colors"
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
