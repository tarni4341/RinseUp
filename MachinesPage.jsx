import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Clock, AlertTriangle, Filter, ArrowRight, Check, RefreshCw } from 'lucide-react';
import MachineCard from '../components/MachineCard';
import MachineModal from '../components/MachineModal';
import { useLaundry } from '../context/LaundryContext';

export default function MachinesPage() {
  const { machines, selectedMachine, clearSelectedMachine, setActiveTab } = useLaundry();
  const [filter, setFilter] = useState('all'); // 'all' | 'available' | 'in-use' | 'floor1' | 'floor2'
  const [modalMachine, setModalMachine] = useState(null);

  // Stats calculation
  const totalAvailable = machines.filter((m) => m.status === 'available').length;
  const totalRunning = machines.filter((m) => m.status === 'in-use').length;
  const totalMaintenance = machines.filter((m) => m.status === 'out-of-order' || m.status === 'setting-up').length;

  // Filter machines
  const filteredMachines = machines.filter((m) => {
    if (filter === 'available') return m.status === 'available';
    if (filter === 'in-use') return m.status === 'in-use';
    if (filter === 'floor1') return m.location.includes('Ground') || m.location.includes('Floor 1');
    if (filter === 'floor2') return m.location.includes('Floor 2');
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-purple-50/40 to-indigo-50/60 border border-white/80 p-6 sm:p-10 shadow-[0_10px_35px_rgba(99,102,241,0.06)] backdrop-blur-md">
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-200/40 via-indigo-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR CAMPUS LAUNDRY, SIMPLIFIED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            Laundry day, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
              made effortless.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
            Find an available machine, add your clothes, and let WashWise figure out the perfect wash.
            Real-time door status, load capacity tracking, and smart fabric mode detection for hostel students.
          </p>

          {/* Quick Summary Counter Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
            {/* Available */}
            <div className="bg-white/90 rounded-2xl p-3 sm:p-4 border border-emerald-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {totalAvailable}
                </div>
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Available Now
                </div>
              </div>
            </div>

            {/* Currently Running */}
            <div className="bg-white/90 rounded-2xl p-3 sm:p-4 border border-pink-100 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {totalRunning}
                </div>
                <div className="text-[11px] font-bold text-pink-700 uppercase tracking-wider">
                  In Progress
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-white/90 rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {totalMaintenance}
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Offline / Setup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTIVE SELECTION BANNER (If Selected) ================= */}
      {selectedMachine && (
        <div className="bg-purple-600 text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-purple-600/25 flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-purple-200">
                Selected Machine
              </div>
              <div className="text-lg font-extrabold">
                {selectedMachine.name} ({selectedMachine.capacity} kg) — Door Open & Ready
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={clearSelectedMachine}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              Change Machine
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-purple-900 hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Add Clothes to Basket</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION HEADER & FILTER PILLS ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Hostel Block B Washers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Look for open-door machines ready to accept your laundry load.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: `All (${machines.length})` },
            { id: 'available', label: `Available (${totalAvailable})` },
            { id: 'in-use', label: `In Use (${totalRunning})` },
            { id: 'floor1', label: 'Ground & 1st Floor' },
            { id: 'floor2', label: '2nd Floor' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MACHINES GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMachines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onOpenModal={(m) => setModalMachine(m)}
          />
        ))}
      </div>

      {/* Empty Filter State */}
      {filteredMachines.length === 0 && (
        <div className="text-center py-12 bg-white/70 rounded-3xl border border-slate-200 p-8">
          <p className="text-slate-600 font-semibold mb-2">No machines match this filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="text-xs font-bold text-purple-600 hover:text-purple-800"
          >
            Show All Machines
          </button>
        </div>
      )}

      {/* Machine Details Modal */}
      {modalMachine && (
        <MachineModal machine={modalMachine} onClose={() => setModalMachine(null)} />
      )}
    </div>
  );
}

