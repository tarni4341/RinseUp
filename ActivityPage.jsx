import React from 'react';
import { Activity, Clock, CheckCircle2, Weight, ArrowRight, PlayCircle, WashingMachine as MachineIcon, Calendar, Sparkles } from 'lucide-react';
import { useLaundry } from '../context/LaundryContext';

export default function ActivityPage() {
  const { activityHistory, currentCycle, setActiveTab } = useLaundry();

  const isCurrentRunning = currentCycle && currentCycle.stage !== 'Complete';

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>LAUNDRY LOG & HISTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            My Activity
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Track ongoing cycles and review your previous campus laundry sessions.
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-2xl font-black text-purple-700">
            {activityHistory.length}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Washes
          </div>
        </div>
      </div>

      {/* ================= ACTIVE CYCLE LIVE CARD (IF RUNNING) ================= */}
      {isCurrentRunning && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-xl shadow-purple-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse-subtle">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <PlayCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-900 animate-ping" />
                Live Washing Cycle
              </div>
              <h3 className="text-lg font-black">
                {currentCycle.machineName} • {currentCycle.mode.name}
              </h3>
              <p className="text-xs text-purple-100">
                {currentCycle.stage} phase ({currentCycle.progress}% done) • ~{Math.max(1, Math.round(((100 - currentCycle.progress) / 100) * currentCycle.mode.durationMinutes))} min remaining
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('progress')}
            className="px-5 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-xs hover:bg-purple-50 transition-all flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <span>Open Live Monitor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ================= COMPLETED SESSIONS HISTORY ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          Previous Laundry Sessions
        </h2>

        {activityHistory.length === 0 ? (
          <div className="text-center py-12 px-6 rounded-3xl bg-white/80 border border-slate-100 text-slate-400 text-sm">
            <Activity className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            No previous laundry history yet.
          </div>
        ) : (
          <div className="space-y-3">
            {activityHistory.map((act) => (
              <div
                key={act.id}
                className="bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-100/90 hover:border-purple-200 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Left: Machine & Mode */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <MachineIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-base text-slate-900">
                        {act.machineName}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3" /> {act.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {act.modeName} • {act.itemSummary || `${act.totalItems} garments`}
                    </p>
                  </div>
                </div>

                {/* Right: Metrics & Date */}
                <div className="flex items-center justify-between sm:justify-end gap-6 text-xs text-slate-600 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-slate-900 flex items-center gap-1 sm:justify-end">
                      <Weight className="w-3.5 h-3.5 text-purple-600" />
                      <span>{act.totalWeightKg} kg ({act.totalItems} items)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 sm:justify-end">
                      <Clock className="w-3 h-3" /> {act.durationMinutes} mins cycle
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-1 text-slate-400 text-xs font-semibold whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= HOSTEL ECO STATS FOOTER ================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-tr from-purple-50 via-white to-indigo-50/70 border border-purple-100 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-black text-purple-900 text-sm block mb-1">
            🌱 Campus Eco Impact
          </span>
          <p className="text-slate-500 max-w-lg">
            By optimizing wash loads and temperatures with WashWise, Hostel Block B saved approximately 180 liters of water and 14 kWh of electricity this month.
          </p>
        </div>
        <div className="flex gap-4 text-center">
          <div className="p-2.5 rounded-xl bg-white border border-purple-100 min-w-20">
            <span className="font-black text-emerald-600 text-base block">~32 L</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Water Saved</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-purple-100 min-w-20">
            <span className="font-black text-purple-600 text-base block">4.8 kWh</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Power Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

