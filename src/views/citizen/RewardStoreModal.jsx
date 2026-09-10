import React from 'react';
import { useApp } from '../../context/AppContext';

export const RewardStoreModal = ({ isOpen, onClose }) => {
  const { citizenScore, showToast } = useApp();
  if (!isOpen) return null;

  const rewards = [
    { title: "₹250 Property Tax Rebate Voucher", cost: 80, icon: "receipt_long", desc: "Redeemable against annual municipal property tax." },
    { title: "Free 10kg Bio-Enriched Compost Bag", cost: 40, icon: "eco", desc: "Collected from local ward biomethanation plant." },
    { title: "50% Off City Metro & Bus Daily Pass", cost: 50, icon: "directions_bus", desc: "Sustainable green commuter mobility credit." },
    { title: "Swachh Citizen Gold Lapel Pin & Certificate", cost: 90, icon: "workspace_premium", desc: "Delivered to your residence by Ward Councilor." }
  ];

  const handleRedeem = (item) => {
    if (citizenScore < item.cost) {
      showToast(`Insufficient Swachh Points! You have ${citizenScore}, required: ${item.cost}`, "error");
      return;
    }
    showToast(`Redeemed: ${item.title}! Digital coupon sent to your mobile SMS.`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-amber-500 text-2xl">workspace_premium</span>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Swachh Citizen Rewards Store</h3>
              <p className="text-xs text-on-surface-variant">Your Balance: <strong>{citizenScore} Civic Points</strong></p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-outline hover:text-on-surface">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {rewards.map((r, i) => (
            <div key={i} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl">{r.icon}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-on-surface">{r.title}</div>
                  <div className="text-[11px] text-on-surface-variant">{r.desc}</div>
                  <div className="text-xs font-black text-primary mt-1">{r.cost} Points</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRedeem(r)}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold shadow-xs shrink-0"
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
