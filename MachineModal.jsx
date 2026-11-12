import React from 'react';
import { X, Check, Weight, MapPin, Zap, ShieldCheck, Clock, Sparkles, ChevronRight, Droplets } from 'lucide-react';
import WashingMachine from './WashingMachine';
import { useLaundry } from '../context/LaundryContext';

export default function MachineModal({ machine, onClose }) {
  const { selectedMachineId, selectMachine, setActiveTab } = useLaundry();

  if (!machine) return null;

  const isSelected = selectedMachineId === machine.id;
  const isAvailable = machine.status === 'available';

  const handleChooseAndProceed = () => {
    if (isAvailable) {
      selectMachine(machine.id);
      setActiveTab('cart');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              {machine.code}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">{machine.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Machine Illustration & Status Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-gradient-to-tr from-purple-50/60 via-slate-50 to-indigo-50/40 border border-purple-100/60 mb-6">
            <div className="flex-shrink-0">
              <WashingMachine
                doorState={machine.doorState}
                status={machine.status}
                size="md"
                progress={machine.cycleProgress}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 mb-2">
                {isAvailable ? (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    READY FOR LAUNDRY • DOOR OPEN
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 capitalize">
                    {machine.status.replace('-', ' ')}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                {isAvailable ? 'Freshly Sanitized & Ready' : 'Machine Busy or Inactive'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Equipped with intelligent load sensors, dynamic anti-vibration dampers, and eco-inverter motor.
              </p>

              <div className="mt-3 flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <Weight className="w-4 h-4 text-purple-600" /> {machine.capacity} kg Max
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-500" /> A+++ Eco
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" /> Smart Rinse
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> Location
              </div>
              <div className="text-sm font-semibold text-slate-800">{machine.location}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Ground / Hallway access, open 24/7</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Drum & Hygiene
              </div>
              <div className="text-sm font-semibold text-slate-800">Antibacterial Stainless Gasket</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Steam allergen sanitized at 60°C</p>
            </div>
          </div>

          {/* Machine Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Hardware Features
            </h4>
            <div className="flex flex-wrap gap-2">
              {machine.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-50 text-purple-800 border border-purple-100 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Hostel Student Laundry Tip */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Hostel etiquette tip:</span> Please prompt your clothes within 15 minutes of cycle completion so fellow students can access the washer.
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors"
          >
            Close
          </button>

          {isAvailable ? (
            <button
              onClick={handleChooseAndProceed}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-purple-600 text-white shadow-md shadow-purple-600/30 hover:bg-purple-700 active:scale-98 transition-all flex items-center gap-2"
            >
              <span>{isSelected ? 'Proceed with Selected Machine' : 'Select & Add Clothes'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-200 text-slate-400 cursor-not-allowed"
            >
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

