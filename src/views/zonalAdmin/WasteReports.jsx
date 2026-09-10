import React from 'react';
import { useApp } from '../../context/AppContext';

export const WasteReports = () => {
  const { zonalMetrics, showToast } = useApp();

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Category,Tonnage (MT),Percentage,Processing Facility\n"
      + `Wet Organic Waste,${zonalMetrics.wetWasteMT},57.6%,Biomethanation & Composting Plant 3\n`
      + `Dry Recyclable Waste,${zonalMetrics.dryRecyclableMT},34.1%,Dry Waste Collection Centre (DWCC)\n`
      + `Domestic Hazardous,${zonalMetrics.domesticHazardousMT},8.3%,Authorized Common Bio-Medical Facility\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Zonal_Waste_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Zonal Waste Audit CSV report generated and downloaded!", "success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Zonal Waste Collection & Segregation Reports</h2>
          <p className="text-xs text-on-surface-variant">
            Empirical wet, dry, and sanitary waste tonnages processed through municipal material recovery facilities
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-deep shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export Official Audit (CSV)</span>
        </button>
      </div>

      {/* Tonnage Distribution Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Wet Organic */}
        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">WET ORGANIC</span>
            <span className="material-symbols-outlined text-emerald-700 text-2xl">compost</span>
          </div>
          <div>
            <div className="text-3xl font-black">{zonalMetrics.wetWasteMT} MT</div>
            <p className="text-xs text-emerald-800 mt-1">Converted to Bio-CNG & Organic Manure</p>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: '58%' }}></div>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex justify-between">
            <span>Daily Yield: 92.4 MT Compost</span>
            <span>58% Share</span>
          </div>
        </div>

        {/* Dry Recyclable */}
        <div className="p-5 rounded-3xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">DRY RECYCLABLE</span>
            <span className="material-symbols-outlined text-blue-700 text-2xl">recycling</span>
          </div>
          <div>
            <div className="text-3xl font-black">{zonalMetrics.dryRecyclableMT} MT</div>
            <p className="text-xs text-blue-800 mt-1">Processed at Zonal DWCC & Aggregators</p>
          </div>
          <div className="w-full h-2 rounded-full bg-blue-200 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '34%' }}></div>
          </div>
          <div className="text-[11px] text-blue-700 font-semibold flex justify-between">
            <span>RDF Fuel Produced: 114 MT</span>
            <span>34% Share</span>
          </div>
        </div>

        {/* Hazardous Sanitary */}
        <div className="p-5 rounded-3xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">DOMESTIC HAZARDOUS</span>
            <span className="material-symbols-outlined text-rose-700 text-2xl">medical_services</span>
          </div>
          <div>
            <div className="text-3xl font-black">{zonalMetrics.domesticHazardousMT} MT</div>
            <p className="text-xs text-rose-800 mt-1">Scientific Autoclaving & Incineration</p>
          </div>
          <div className="w-full h-2 rounded-full bg-rose-200 overflow-hidden">
            <div className="h-full bg-rose-600 rounded-full" style={{ width: '8%' }}></div>
          </div>
          <div className="text-[11px] text-rose-700 font-semibold flex justify-between">
            <span>100% CPCB Compliance</span>
            <span>8% Share</span>
          </div>
        </div>
      </div>

      {/* Recovery Facility Details */}
      <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-on-surface">Material Recovery Facility (MRF) Daily Intake Log</h3>
        
        <div className="space-y-3 text-xs">
          {[
            { plant: "Indiranagar Bio-Methanation Plant #3", capacity: "50 TPD", currentLoad: "46.2 TPD (92%)", output: "Supplies electricity to 340 streetlights", status: "Operational" },
            { plant: "Domlur Dry Waste Collection Centre (DWCC)", capacity: "30 TPD", currentLoad: "28.5 TPD (95%)", output: "Plastic, cardboard & glass baled for mills", status: "Operational" },
            { plant: "East Zone Refuse Derived Fuel (RDF) Feeder", capacity: "80 TPD", currentLoad: "74.0 TPD (92%)", output: "Shipped to local cement kilns as coal alternative", status: "Operational" },
          ].map((fac, i) => (
            <div key={i} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-on-surface">{fac.plant}</div>
                <div className="text-outline text-[11px]">Capacity: {fac.capacity} | Current Load: {fac.currentLoad}</div>
                <div className="text-primary font-semibold text-[11px] mt-0.5">{fac.output}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] self-start sm:self-center">
                {fac.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
