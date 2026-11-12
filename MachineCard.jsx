import React from 'react';
import { Check, Clock, AlertTriangle, Sparkles, MapPin, Weight, ShieldCheck, ChevronRight } from 'lucide-react';
import WashingMachine from './WashingMachine';
import { useLaundry } from '../context/LaundryContext';

export default function MachineCard({ machine, onOpenModal }) {
  const { selectedMachineId, selectMachine, setActiveTab } = useLaundry();

  const isSelected = selectedMachineId === machine.id;
  const isAvailable = machine.status === 'available';
  const isInUse = machine.status === 'in-use';
  const isOutOfOrder = machine.status === 'out-of-order';
  const isSettingUp = machine.status === 'setting-up';

  // Handler for choose machine button
  const handleSelect = (e) => {
    e.stopPropagation();
    if (!isAvailable) return;
    selectMachine(machine.id);
  };

  const handleCardClick = () => {
    if (onOpenModal) {
      onOpenModal(machine);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'ring-2 ring-purple-600 border-purple-300 shadow-[0_12px_36px_rgba(124,58,237,0.18)] scale-[1.01]'
          : 'border-slate-100 hover:border-purple-200 hover:shadow-[0_12px_32px_rgba(99,102,241,0.08)]'
      }`}
    >
      {/* Top Header Row: Name & Status Pill */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {machine.code}
              </span>
              {isSelected && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white shadow-sm">
                  <Check className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-purple-700 transition-colors">
              {machine.name}
            </h3>
          </div>

          {/* Status Badge */}
          {isAvailable && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm shadow-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE
            </span>
          )}

          {isInUse && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200/80">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              IN USE
            </span>
          )}

          {isOutOfOrder && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
              <AlertTriangle className="w-3 h-3 text-rose-500" />
              OUT OF ORDER
            </span>
          )}

          {isSettingUp && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
              <Clock className="w-3 h-3 text-blue-500" />
              SETTING UP
            </span>
          )}
        </div>

        {/* Location & Capacity Badges */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 font-medium">
          <div className="flex items-center gap-1">
            <Weight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{machine.capacity} kg Capacity</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 truncate max-w-[170px]" title={machine.location}>
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{machine.location.split('•')[1]?.trim() || machine.location}</span>
          </div>
        </div>

        {/* Large Washing Machine SVG Illustration */}
        <div className="my-3 py-2 flex items-center justify-center bg-gradient-to-b from-slate-50/50 to-purple-50/20 rounded-2xl border border-slate-100/60 transition-transform duration-300 group-hover:scale-[1.02]">
          <WashingMachine
            doorState={machine.doorState}
            status={machine.status}
            size="md"
            progress={machine.cycleProgress}
            glowEffect={isSelected}
          />
        </div>

        {/* Status contextual information */}
        <div className="min-h-[58px] flex flex-col justify-center my-2 text-xs">
          {isAvailable && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">Ready for your laundry</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold bg-white/70 px-2 py-0.5 rounded-md">
                Door Open
              </span>
            </div>
          )}

          {isInUse && (
            <div className="p-2.5 rounded-xl bg-pink-50/80 border border-pink-100 text-pink-900">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold">Currently washing</span>
                <span className="font-bold text-pink-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {machine.remainingMinutes} min remaining
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-pink-200/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-pink-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${machine.cycleProgress || 45}%` }}
                />
              </div>
            </div>
          )}

          {isOutOfOrder && (
            <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-800">
              <div className="font-bold flex items-center gap-1.5 text-rose-900 mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Service in Progress</span>
              </div>
              <p className="text-[11px] text-rose-600">
                Drain filter service in progress. Campus facilities notified.
              </p>
            </div>
          )}

          {isSettingUp && (
            <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-900">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Cycle being prepared</span>
                <span className="font-bold text-blue-700">~{machine.remainingMinutes || 3} min</span>
              </div>
              <p className="text-[11px] text-blue-600">
                Auto-cleaning drum rinse cycle underway. Available shortly.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Action Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        {isAvailable ? (
          isSelected ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('cart');
              }}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-purple-700 text-white shadow-md shadow-purple-600/25 hover:bg-purple-800 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Cart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSelect}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-purple-600 text-white shadow-sm shadow-purple-600/20 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-600/30 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Choose machine</span>
            </button>
          )
        ) : (
          <button
            disabled
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-100 text-slate-400 cursor-not-allowed flex items-center justify-center gap-1"
          >
            {isInUse
              ? `In use (${machine.remainingMinutes}m left)`
              : isOutOfOrder
              ? 'Unavailable'
              : 'Setting up'}
          </button>
        )}

        {/* Info button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenModal) onOpenModal(machine);
          }}
          title="Machine specs & details"
          className="p-2.5 rounded-xl border border-slate-200/80 text-slate-500 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

