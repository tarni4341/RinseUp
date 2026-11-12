import React from 'react';
import { WashingMachine as WashIcon, ShoppingBag, Sparkles, Activity, User, RotateCcw, PlayCircle } from 'lucide-react';
import { useLaundry } from '../context/LaundryContext';

export default function Navbar({ onOpenProfile }) {
  const { activeTab, setActiveTab, cartItems, currentCycle, resetDemoData } = useLaundry();

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const isWashingActive = currentCycle && currentCycle.stage !== 'Complete';

  const navItems = [
    {
      id: 'machines',
      label: 'Machines',
      icon: WashIcon,
      badge: null,
    },
    {
      id: 'cart',
      label: 'My Laundry',
      icon: ShoppingBag,
      badge: totalCartCount > 0 ? totalCartCount : null,
      badgeColor: 'bg-purple-600',
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'progress',
      label: 'In Progress',
      icon: PlayCircle,
      badge: isWashingActive ? 'LIVE' : null,
      badgeColor: 'bg-emerald-500 animate-pulse',
      highlight: isWashingActive,
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: Activity,
      badge: null,
    },
  ];

  return (
    <>
      {/* ================= DESKTOP FLOATING NAVBAR ================= */}
      <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl px-4 py-3 sm:px-6 flex items-center justify-between transition-all">
          
          {/* LOGO & BRAND */}
          <button
            onClick={() => setActiveTab('machines')}
            className="flex items-center gap-3 group text-left transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="20" x="3" y="2" rx="3" />
                <circle cx="12" cy="13" r="5" />
                <path d="M12 11c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5" />
                <circle cx="7" cy="6" r="1" fill="currentColor" />
                <circle cx="10" cy="6" r="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
                  Wash<span className="text-purple-600">Wise</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
                  Campus
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none hidden sm:block">
                Smart Hostel Laundry
              </p>
            </div>
          </button>

          {/* DESKTOP NAV TABS */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-purple-700 shadow-sm shadow-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white ${
                        item.badgeColor || 'bg-purple-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS: HOSTEL ROOM & USER AVATAR */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Demo Reset */}
            <button
              onClick={resetDemoData}
              title="Reset sample data"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* Hostel Location Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100/80 text-xs font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Block B • Room 304</span>
            </div>

            {/* Student Avatar button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                AK
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-purple-700">
                  Aarav K.
                </div>
                <div className="text-[10px] text-slate-500 leading-none">B.Tech 3rd Yr</div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM FLOATING NAVIGATION ================= */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.12)] rounded-2xl px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-purple-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-purple-600' : ''}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[9px] font-bold px-1 rounded-full text-white ${
                      item.badgeColor || 'bg-purple-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5" />}
            </button>
          );
        })}
      </nav>
    </>
  );
}

