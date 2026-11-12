import React from 'react';
import { Plus, Minus, Trash2, ShoppingBag, Sparkles, AlertCircle, ArrowRight, Check, PackagePlus, Info, Weight, WashingMachine as MachineIcon } from 'lucide-react';
import { CLOTHING_CATEGORIES } from '../data/defaultData';
import ClothingIcon from '../components/ClothingIcon';
import { useLaundry } from '../context/LaundryContext';

export default function CartPage() {
  const {
    cartItems,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    loadPresetDemoClothes,
    selectedMachine,
    machines,
    selectMachine,
    recommendation,
    setActiveTab,
  } = useLaundry();

  const machineCapacity = selectedMachine?.capacity || 7.0;
  const currentWeight = recommendation.totalWeight;
  const remainingWeight = Math.max(0, Number((machineCapacity - currentWeight).toFixed(2)));
  const capacityPercent = Math.min(100, Math.round((currentWeight / machineCapacity) * 100));
  const isOverweight = recommendation.isOverweight;

  // Auto-pick first available machine if student jumped straight into cart
  const availableMachines = machines.filter((m) => m.status === 'available');

  const handleProceed = () => {
    if (cartItems.length === 0 || isOverweight) return;
    if (!selectedMachine && availableMachines.length > 0) {
      selectMachine(availableMachines[0].id);
    }
    setActiveTab('recommendation');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold uppercase tracking-widest mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>VIRTUAL LAUNDRY BASKET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Add Your Clothes
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Select what you are washing. We will calculate load weight and recommend the ideal wash mode.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadPresetDemoClothes}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 hover:bg-indigo-100 transition-colors shadow-sm"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Load Demo Basket</span>
          </button>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Empty</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= MACHINE ASSIGNMENT BAR ================= */}
      <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
            <MachineIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Assigned Machine
            </div>
            {selectedMachine ? (
              <div className="text-sm font-extrabold text-slate-900">
                {selectedMachine.name} • {selectedMachine.capacity} kg Capacity
                <span className="text-xs font-normal text-slate-500 ml-1">
                  ({selectedMachine.location.split('•')[1]?.trim() || selectedMachine.location})
                </span>
              </div>
            ) : (
              <div className="text-sm font-extrabold text-amber-700">
                No machine selected yet
                <span className="text-xs font-normal text-slate-500 ml-1">
                  (We will assign {availableMachines[0]?.name || 'Washer No. 01'} automatically)
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setActiveTab('machines')}
          className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200/60 transition-colors"
        >
          {selectedMachine ? 'Change Machine' : 'Pick Available Machine'}
        </button>
      </div>

      {/* ================= MAIN CONTENT: GRID + SUMMARY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CLOTHING SELECTION CATALOG (8 COLS) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">
              Clothing Categories
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Tap + to add garments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CLOTHING_CATEGORIES.map((cat) => {
              const inCart = cartItems.find((i) => i.id === cat.id);
              const qty = inCart ? inCart.quantity : 0;

              return (
                <div
                  key={cat.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    qty > 0
                      ? 'bg-purple-50/70 border-purple-200 shadow-sm'
                      : 'bg-white/80 border-slate-100 hover:border-purple-100 hover:bg-white'
                  }`}
                >
                  {/* Left: Icon & Names */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <ClothingIcon type={cat.iconType} color={cat.color} className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 leading-tight">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        ~{cat.weightKg} kg / item
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Adjuster */}
                  <div className="flex items-center gap-1.5 bg-white rounded-xl border border-slate-200 p-1 shadow-xs">
                    <button
                      onClick={() => updateItemQuantity(cat.id, -1)}
                      disabled={qty === 0}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        qty > 0
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span
                      className={`w-6 text-center text-xs font-black ${
                        qty > 0 ? 'text-purple-700' : 'text-slate-400'
                      }`}
                    >
                      {qty}
                    </span>

                    <button
                      onClick={() => updateItemQuantity(cat.id, 1)}
                      className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 active:scale-95 transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RUNNING LAUNDRY SUMMARY & ACTION (4-5 COLS) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-5">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-[0_12px_36px_rgba(99,102,241,0.08)]">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4">
              Laundry Summary
            </h3>

            {/* Capacity Meter */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5 text-purple-600" /> Machine Load Weight
                </span>
                <span className="font-extrabold text-slate-900">
                  <span className={isOverweight ? 'text-rose-600 font-black' : 'text-purple-700'}>
                    {currentWeight} kg
                  </span>{' '}
                  / {machineCapacity} kg
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverweight
                      ? 'bg-rose-500'
                      : capacityPercent > 80
                      ? 'bg-amber-500'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600'
                  }`}
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>{capacityPercent}% filled</span>
                <span>
                  {isOverweight ? (
                    <span className="text-rose-600 font-bold">
                      +{(currentWeight - machineCapacity).toFixed(1)} kg overweight!
                    </span>
                  ) : (
                    <span>{remainingWeight} kg space remaining</span>
                  )}
                </span>
              </div>
            </div>

            {/* Overweight Alert */}
            {isOverweight && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs mb-4 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Overload Warning:</strong> Your laundry exceeds {selectedMachine?.name || 'this washer'}'s {machineCapacity} kg drum limit. Remove items or pick an 8 kg machine.
                </p>
              </div>
            )}

            {/* Cart Itemized List */}
            <div className="space-y-2 mb-6 max-h-56 overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40 text-purple-400" />
                  Your basket is currently empty. Tap items on the left or click "Load Demo Basket".
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="text-slate-400">
                        ({(item.weightKg * item.quantity).toFixed(2)} kg)
                      </span>
                    </div>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold text-slate-900">{recommendation.totalCount} items</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Weight</span>
                <span className="font-bold text-slate-900">{currentWeight} kg</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-100">
                <span>Recommended Spin Level</span>
                <span className="text-purple-700">Auto-calculated</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleProceed}
              disabled={cartItems.length === 0 || isOverweight}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                cartItems.length > 0 && !isOverweight
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 hover:bg-purple-700 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Find my perfect wash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Hostel Tip */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Smart tip:</strong> WashWise analyzes fabric density. Mixing heavy denim with delicates triggers a protective low-spin recommendation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

