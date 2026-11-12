import React from 'react';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  FastForward,
  Check,
  RotateCcw,
  Pause,
  Play,
  Droplets,
  Zap,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  WashingMachine as MachineIcon,
} from 'lucide-react';
import WashingMachine from '../components/WashingMachine';
import { useLaundry } from '../context/LaundryContext';

export default function WashingProgressPage() {
  const {
    currentCycle,
    setCurrentCycle,
    finishCycleNow,
    dismissCompletedCycle,
    cancelWashCycle,
    setActiveTab,
  } = useLaundry();

  // If no cycle is currently running
  if (!currentCycle) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-6 bg-white/80 rounded-3xl border border-slate-100 shadow-sm animate-fade-in my-8">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
          <MachineIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">No Active Laundry Cycle</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          You don't have a wash currently running. Select an available washer, add your garments, and start your smart wash!
        </p>
        <button
          onClick={() => setActiveTab('machines')}
          className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition-all"
        >
          Browse Available Washers
        </button>
      </div>
    );
  }

  const isCompleted = currentCycle.stage === 'Complete' || currentCycle.progress >= 100;

  const stages = [
    { name: 'Washing', icon: Droplets, desc: 'Eco-detergent dissolution & foam agitation' },
    { name: 'Rinsing', icon: Sparkles, desc: 'Fresh water cascading rinse to clear residue' },
    { name: 'Spinning', icon: Zap, desc: 'High RPM water extraction' },
    { name: 'Complete', icon: CheckCircle2, desc: 'Cycle finished • Ready for pickup' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.name === currentCycle.stage);

  // Skip to next stage handler
  const handleSkipToNextStage = () => {
    if (isCompleted) return;
    setCurrentCycle((prev) => {
      if (!prev) return prev;
      let nextStage = 'Rinsing';
      let nextProgress = 45;
      let nextRemaining = Math.round(prev.totalSeconds * 0.55);

      if (prev.stage === 'Washing') {
        nextStage = 'Rinsing';
        nextProgress = 45;
        nextRemaining = Math.round(prev.totalSeconds * 0.55);
      } else if (prev.stage === 'Rinsing') {
        nextStage = 'Spinning';
        nextProgress = 80;
        nextRemaining = Math.round(prev.totalSeconds * 0.2);
      } else {
        finishCycleNow();
        return prev;
      }

      return {
        ...prev,
        stage: nextStage,
        progress: nextProgress,
        remainingSeconds: nextRemaining,
      };
    });
  };

  // Toggle pause
  const togglePause = () => {
    setCurrentCycle((prev) => (prev ? { ...prev, isPaused: !prev.isPaused } : null));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black uppercase tracking-wider mb-2">
          {isCompleted ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> CYCLE COMPLETED
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              SIMULATED LIVE TELEMETRY
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isCompleted ? 'Your Laundry is Ready!' : 'Your Laundry is in Progress'}
        </h1>

        <p className="text-slate-500 text-sm font-medium mt-1">
          {currentCycle.machineName} • {currentCycle.mode.name} ({currentCycle.mode.temperature})
        </p>
      </div>

      {/* ================= MAIN INTERACTIVE DRUM CARD ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/95 via-purple-50/40 to-slate-50 border border-slate-100 shadow-[0_16px_45px_rgba(99,102,241,0.08)] p-6 sm:p-10 flex flex-col items-center">
        {/* Animated Circular Drum Presentation */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Circular Progress Ring Surrounding Drum */}
          <div className="relative flex items-center justify-center">
            <svg className="w-72 h-72 sm:w-84 sm:h-84 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-slate-200"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-purple-600 transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (1000 * currentCycle.progress) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Centered Washing Machine Illustration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-90 sm:scale-100">
              <WashingMachine
                doorState={isCompleted ? 'open' : 'closed'}
                status={isCompleted ? 'available' : 'running'}
                size="md"
                isSpinning={!isCompleted && !currentCycle.isPaused}
                showWater={!isCompleted && currentCycle.stage !== 'Spinning'}
                progress={currentCycle.progress}
              />
            </div>
          </div>
        </div>

        {/* Live Remaining Time & Percentage Pill */}
        <div className="text-center mt-2 mb-6">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isCompleted ? '00:00' : `${Math.floor(currentCycle.remainingSeconds / 60)}:${(currentCycle.remainingSeconds % 60).toString().padStart(2, '0')}`}
          </div>
          <div className="text-xs font-bold text-slate-400 mt-1 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>
              {isCompleted ? 'Finished!' : `${currentCycle.progress}% completed (~${Math.max(1, Math.round(((100 - currentCycle.progress) / 100) * currentCycle.mode.durationMinutes))} min cycle est.)`}
            </span>
          </div>
        </div>

        {/* ================= 4 CYCLE STAGES PROGRESS BAR ================= */}
        <div className="w-full max-w-2xl px-2 py-4 border-t border-b border-slate-100 my-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            {stages.map((stg, idx) => {
              const StgIcon = stg.icon;
              const isPast = idx < currentStageIndex || isCompleted;
              const isCurrent = idx === currentStageIndex && !isCompleted;

              return (
                <div key={stg.name} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-purple-600 text-white ring-4 ring-purple-100 animate-pulse'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <StgIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span
                    className={`text-xs font-extrabold ${
                      isCurrent
                        ? 'text-purple-700'
                        : isPast
                        ? 'text-emerald-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {stg.name}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block mt-0.5 leading-tight">
                    {stg.desc.split('•')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= DEMO CONTROLS (QUICK EVALUATION TOOLBAR) ================= */}
        <div className="w-full max-w-xl bg-purple-50/60 rounded-2xl p-4 border border-purple-100 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Demo Cycle Controller
            </span>
            <span className="text-[10px] font-bold text-purple-600 bg-white/80 px-2 py-0.5 rounded-md">
              Fast evaluation tools
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {!isCompleted ? (
              <>
                <button
                  onClick={togglePause}
                  className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                >
                  {currentCycle.isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{currentCycle.isPaused ? 'Resume' : 'Pause'}</span>
                </button>

                <button
                  onClick={handleSkipToNextStage}
                  className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Next Stage</span>
                </button>

                <button
                  onClick={finishCycleNow}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-black shadow-sm transition-all flex items-center gap-1 active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Complete Cycle Now</span>
                </button>

                <button
                  onClick={cancelWashCycle}
                  className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={dismissCompletedCycle}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Collect Laundry & Return to Machines</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= COMPLETED CELEBRATION CARD ================= */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-slide-up">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-900">
                Laundry Complete — Machine Door Unlocked
              </h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                {currentCycle.machineName} is now ready for pickup. The door has opened automatically and the cycle is logged to your Activity history.
              </p>
            </div>
          </div>

          <button
            onClick={dismissCompletedCycle}
            className="px-5 py-2.5 rounded-xl font-black text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      )}

      {/* ================= LOAD BREAKDOWN ================= */}
      <div className="bg-white/80 rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900 mb-3">
          Session Load Details
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Machine</span>
            <span className="font-bold text-slate-800">{currentCycle.machineName}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Program</span>
            <span className="font-bold text-slate-800">{currentCycle.mode.name}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Item Count</span>
            <span className="font-bold text-slate-800">{currentCycle.totalCount} garments</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Weight</span>
            <span className="font-bold text-slate-800">{currentCycle.totalWeight} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

