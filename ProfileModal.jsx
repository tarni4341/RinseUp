import React from 'react';
import { X, User, MapPin, Award, RotateCcw, Check, ShieldCheck, Mail, BookOpen } from 'lucide-react';
import { useLaundry } from '../context/LaundryContext';

export default function ProfileModal({ onClose }) {
  const { activityHistory, resetDemoData } = useLaundry();

  const handleReset = () => {
    resetDemoData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white font-black text-base flex items-center justify-center shadow-inner">
              AK
            </div>
            <div>
              <h2 className="text-lg font-black leading-tight">Aarav Kapoor</h2>
              <p className="text-xs text-purple-200">B.Tech Computer Science • 3rd Year</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-600">
          {/* Hostel Info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> Hostel Block
              </span>
              <span className="font-extrabold text-slate-800">Block B (Boys Wing)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Room Allocation
              </span>
              <span className="font-extrabold text-slate-800">Room 304, 3rd Floor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-bold">
                <Mail className="w-3.5 h-3.5 text-blue-600" /> Campus Email
              </span>
              <span className="font-extrabold text-slate-800">aarav.k@campus.edu</span>
            </div>
          </div>

          {/* Laundry Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
              <span className="text-2xl font-black text-purple-700 block">
                {activityHistory.length}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Total Washes
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <span className="text-2xl font-black text-emerald-700 block">Tier 1</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Eco Champion
              </span>
            </div>
          </div>

          {/* Prototype / Demo notice */}
          <div className="p-3.5 rounded-2xl bg-slate-50 text-[11px] text-slate-500 border border-slate-200/80 leading-relaxed">
            <strong className="text-slate-800">Prototype Notice:</strong> WashWise is a campus laundry management prototype utilizing LocalStorage for live simulations and state updates.
          </div>

          {/* Reset Demo Data Action */}
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Machines & Sample Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

