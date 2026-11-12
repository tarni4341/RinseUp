import React, { useState } from 'react';
import {
  Sparkles,
  Thermometer,
  RotateCw,
  Clock,
  Droplets,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  WashingMachine as MachineIcon,
  Shirt,
  Play,
} from 'lucide-react';
import { WASH_MODES } from '../data/defaultData';
import { useLaundry } from '../context/LaundryContext';

export default function RecommendationPage() {
  const {
    recommendation,
    selectedMachine,
    cartItems,
    startWashCycle,
    setActiveTab,
  } = useLaundry();

  const [activeSelectedMode, setActiveSelectedMode] = useState(
    recommendation.recommendedMode || WASH_MODES[1]
  );

  const isOverweight = recommendation.isOverweight;
  const isRecommended = activeSelectedMode.id === recommendation.recommendedMode?.id;

  const handleStartWashing = () => {
    if (isOverweight || cartItems.length === 0) return;
    startWashCycle(activeSelectedMode);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveTab('cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to clothes</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">
              AI Fabric Analysis Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            We've found your perfect wash.
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Custom cycle parameters optimized for {cartItems.length} clothing item{cartItems.length > 1 ? 's' : ''} ({recommendation.totalWeight} kg).
          </p>
        </div>

        {/* Selected Machine Pill */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
            <MachineIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Assigned Drum
            </div>
            <div className="text-xs font-black text-slate-800">
              {selectedMachine ? selectedMachine.name : 'Washer No. 01'}{' '}
              <span className="text-purple-600 font-bold">
                ({selectedMachine ? selectedMachine.capacity : 7} kg max)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OVERWEIGHT WARNING (IF ANY) ================= */}
      {isOverweight && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm text-rose-900">
              Capacity Exceeded — Action Required
            </h4>
            <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
              Your load ({recommendation.totalWeight} kg) exceeds the {selectedMachine?.capacity || 7} kg threshold. Please reduce items in your cart before starting the cycle.
            </p>
            <button
              onClick={() => setActiveTab('cart')}
              className="mt-2 text-xs font-bold text-rose-700 underline hover:text-rose-900"
            >
              Return to Cart & Adjust Items
            </button>
          </div>
        </div>
      )}

      {/* ================= FABRIC SEPARATION WARNINGS (IF ANY) ================= */}
      {recommendation.warnings?.map((w, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 flex items-start gap-3 shadow-xs"
        >
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Smart Care Recommendation: </strong>
            {w.message}
          </div>
        </div>
      ))}

      {/* ================= HERO HIGHLIGHTED RECOMMENDED MODE CARD ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/70 border-2 border-purple-300 shadow-[0_16px_45px_rgba(124,58,237,0.12)] p-6 sm:p-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-purple-600 text-white shadow-sm shadow-purple-600/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {isRecommended ? 'RECOMMENDED MODE' : 'CUSTOM SELECTED MODE'}
            </span>
            <span className="text-xs font-bold text-slate-500 px-2.5 py-1 rounded-full bg-white/80 border border-slate-200">
              {activeSelectedMode.badge}
            </span>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Estimated load: <span className="font-extrabold text-slate-900">{recommendation.totalWeight} kg</span>
          </div>
        </div>

        {/* Mode Name & Description */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            {activeSelectedMode.name}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            {activeSelectedMode.description}
          </p>
        </div>

        {/* 4 Core Parameter Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Temperature */}
          <div className="bg-white/90 rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Temperature
              </div>
              <div className="text-lg font-black text-slate-900">
                {activeSelectedMode.temperature}
              </div>
            </div>
          </div>

          {/* Spin Speed */}
          <div className="bg-white/90 rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Spin Speed
              </div>
              <div className="text-lg font-black text-slate-900">
                {activeSelectedMode.spinSpeed}
              </div>
            </div>
          </div>

          {/* Cycle Duration */}
          <div className="bg-white/90 rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Duration
              </div>
              <div className="text-lg font-black text-slate-900">
                ~{activeSelectedMode.durationMinutes} mins
              </div>
            </div>
          </div>

          {/* Water Level */}
          <div className="bg-white/90 rounded-2xl p-4 border border-purple-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Water Level
              </div>
              <div className="text-lg font-black text-slate-900">
                {activeSelectedMode.waterLevel}
              </div>
            </div>
          </div>
        </div>

        {/* WHY WE CHOSE THIS MODE (Explanation Section) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-purple-100/80 mb-8">
          <h3 className="text-xs font-black uppercase tracking-wider text-purple-800 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Why WashWise Selected This Mode: {recommendation.reasonTitle}
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {recommendation.reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clothes Considered Snapshot */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-slate-500">
          <span className="font-bold text-slate-700">Clothes in this load:</span>
          {cartItems.map((item) => (
            <span
              key={item.id}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold"
            >
              {item.quantity}× {item.name}
            </span>
          ))}
        </div>

        {/* PRIMARY CALL TO ACTION BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-200/60">
          <button
            onClick={() => setActiveTab('cart')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors"
          >
            ← Modify Clothes in Basket
          </button>

          <button
            onClick={handleStartWashing}
            disabled={isOverweight || cartItems.length === 0}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 ${
              isOverweight || cartItems.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-purple-600 text-white shadow-purple-600/30 hover:bg-purple-700 active:scale-98'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Washing Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= ALTERNATIVE MODES LIST ================= */}
      <div className="space-y-4 pt-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Choose Another Wash Mode
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Prefer a different cycle? Tap any mode below to switch parameters instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {WASH_MODES.map((mode) => {
            const isCurrent = activeSelectedMode.id === mode.id;
            const isEngineChoice = mode.id === recommendation.recommendedMode?.id;

            return (
              <div
                key={mode.id}
                onClick={() => setActiveSelectedMode(mode)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-purple-50/90 border-purple-400 shadow-md ring-2 ring-purple-500/20'
                    : 'bg-white/80 border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{mode.name}</h4>
                    {isEngineChoice && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    {mode.bestFor}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>{mode.temperature} • {mode.spinSpeed}</span>
                  <span className="font-bold text-purple-700">~{mode.durationMinutes}m</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

