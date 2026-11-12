import React, { useState } from 'react';
import { LaundryProvider, useLaundry } from './context/LaundryContext';
import FloatingBubbles from './components/FloatingBubbles';
import Navbar from './components/Navbar';
import MachinesPage from './pages/MachinesPage';
import CartPage from './pages/CartPage';
import RecommendationPage from './pages/RecommendationPage';
import WashingProgressPage from './pages/WashingProgressPage';
import ActivityPage from './pages/ActivityPage';
import ProfileModal from './pages/ProfileModal';
import { Sparkles, CheckCircle2, AlertCircle, Info, Heart } from 'lucide-react';

function AppContent() {
  const { activeTab, notification } = useLaundry();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900 bg-[#FAF9FD] text-slate-800">
      {/* Background Floating Bubbles & Soft Gradients */}
      <FloatingBubbles />

      {/* Floating Top Navbar (Desktop) & Bottom Bar (Mobile) */}
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-slide-in">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold border ${
              notification.type === 'success'
                ? 'bg-emerald-500/95 text-white border-emerald-400 shadow-emerald-500/20'
                : notification.type === 'warning'
                ? 'bg-amber-500/95 text-white border-amber-400 shadow-amber-500/20'
                : 'bg-slate-900/90 text-white border-slate-700 shadow-slate-900/30'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            {notification.type === 'warning' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            {notification.type === 'info' && <Info className="w-4 h-4 flex-shrink-0" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 z-10">
        {activeTab === 'machines' && <MachinesPage />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'recommendation' && <RecommendationPage />}
        {activeTab === 'progress' && <WashingProgressPage />}
        {activeTab === 'activity' && <ActivityPage />}
      </main>

      {/* Profile Modal */}
      {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-6 mt-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">WashWise</span>
            <span>•</span>
            <span>Smart Campus Hostel Laundry Management</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Prototype demo powered by LocalStorage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LaundryProvider>
      <AppContent />
    </LaundryProvider>
  );
}

