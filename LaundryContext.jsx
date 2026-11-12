import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_MACHINES, CLOTHING_CATEGORIES, INITIAL_ACTIVITY, WASH_MODES } from '../data/defaultData';
import { analyzeLaundryLoad } from '../data/recommendationEngine';

const LaundryContext = createContext(null);

const STORAGE_KEYS = {
  MACHINES: 'washwise_machines_v1',
  SELECTED_MACHINE: 'washwise_selected_machine_v1',
  CART: 'washwise_cart_v1',
  CURRENT_CYCLE: 'washwise_current_cycle_v1',
  ACTIVITY: 'washwise_activity_v1',
  TAB: 'washwise_tab_v1',
};

export function LaundryProvider({ children }) {
  // Tab navigation
  const [activeTab, setActiveTabState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.TAB) || 'machines';
    } catch {
      return 'machines';
    }
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    try {
      localStorage.setItem(STORAGE_KEYS.TAB, tab);
    } catch (e) {
      console.error(e);
    }
  };

  // Machines state
  const [machines, setMachines] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MACHINES);
      return saved ? JSON.parse(saved) : INITIAL_MACHINES;
    } catch {
      return INITIAL_MACHINES;
    }
  });

  // Selected Machine ID
  const [selectedMachineId, setSelectedMachineId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_MACHINE) || null;
    } catch {
      return null;
    }
  });

  // Cart state: map of categoryId -> { ...category, quantity }
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Washing Cycle
  const [currentCycle, setCurrentCycle] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_CYCLE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Activity History
  const [activityHistory, setActivityHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY;
    } catch {
      return INITIAL_ACTIVITY;
    }
  });

  // Modal / Toast states
  const [selectedMachineForModal, setSelectedMachineForModal] = useState(null);
  const [notification, setNotification] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MACHINES, JSON.stringify(machines));
    } catch (e) {
      console.error(e);
    }
  }, [machines]);

  useEffect(() => {
    try {
      if (selectedMachineId) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_MACHINE, selectedMachineId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_MACHINE);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedMachineId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (currentCycle) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_CYCLE, JSON.stringify(currentCycle));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CYCLE);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentCycle]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityHistory));
    } catch (e) {
      console.error(e);
    }
  }, [activityHistory]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification((curr) => (curr && curr.message === message ? null : curr));
    }, 4000);
  };

  // Selected Machine object
  const selectedMachine = machines.find((m) => m.id === selectedMachineId) || null;

  // Choose machine action
  const selectMachine = (machineId) => {
    const target = machines.find((m) => m.id === machineId);
    if (!target) return;

    if (target.status !== 'available') {
      showNotification(`${target.name} is currently ${target.status.replace('-', ' ')} and cannot be booked.`, 'warning');
      return;
    }

    setSelectedMachineId(machineId);
    showNotification(`${target.name} (${target.capacity} kg) selected for your laundry!`, 'success');
  };

  const clearSelectedMachine = () => {
    setSelectedMachineId(null);
  };

  // Cart operations
  const updateItemQuantity = (categoryId, delta) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === categoryId);
      const catConfig = CLOTHING_CATEGORIES.find((c) => c.id === categoryId);

      if (existingIndex > -1) {
        const item = prev[existingIndex];
        const newQty = item.quantity + delta;

        if (newQty <= 0) {
          return prev.filter((i) => i.id !== categoryId);
        }

        const updated = [...prev];
        updated[existingIndex] = {
          ...item,
          quantity: newQty,
        };
        return updated;
      } else if (delta > 0 && catConfig) {
        return [
          ...prev,
          {
            ...catConfig,
            quantity: delta,
          },
        ];
      }
      return prev;
    });
  };

  const removeItemFromCart = (categoryId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== categoryId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Pre-load demo basket for instant testing
  const loadPresetDemoClothes = () => {
    const preset = [
      { ...CLOTHING_CATEGORIES.find((c) => c.id === 'tshirt'), quantity: 3 },
      { ...CLOTHING_CATEGORIES.find((c) => c.id === 'jeans'), quantity: 1 },
      { ...CLOTHING_CATEGORIES.find((c) => c.id === 'towels'), quantity: 1 },
      { ...CLOTHING_CATEGORIES.find((c) => c.id === 'socks'), quantity: 2 },
    ];
    setCartItems(preset);
    showNotification('Loaded demo laundry basket (7 items, ~1.9 kg)!', 'success');
  };

  // Load calculation
  const recommendation = analyzeLaundryLoad(cartItems, selectedMachine);

  // START CYCLE
  const startWashCycle = (chosenMode) => {
    if (!selectedMachine) {
      showNotification('Please select an available washing machine first!', 'warning');
      setActiveTab('machines');
      return;
    }

    if (cartItems.length === 0) {
      showNotification('Your laundry cart is empty! Add some clothes first.', 'warning');
      setActiveTab('cart');
      return;
    }

    if (recommendation.isOverweight) {
      showNotification('Laundry load exceeds machine capacity! Please reduce weight.', 'warning');
      return;
    }

    const mode = chosenMode || recommendation.recommendedMode;
    // Total simulated duration: 45 seconds demo speed by default (or can be toggled)
    const totalDurationSeconds = 45;

    const newCycle = {
      id: `cycle-${Date.now()}`,
      machineId: selectedMachine.id,
      machineName: selectedMachine.name,
      mode: mode,
      clothesSnapshot: [...cartItems],
      totalWeight: recommendation.totalWeight,
      totalCount: recommendation.totalCount,
      startTime: Date.now(),
      totalSeconds: totalDurationSeconds,
      remainingSeconds: totalDurationSeconds,
      progress: 0,
      stage: 'Washing', // Washing -> Rinsing -> Spinning -> Complete
      isPaused: false,
      speedMultiplier: 1,
    };

    // Update machine status in machines list to 'in-use' with CLOSED door
    setMachines((prev) =>
      prev.map((m) =>
        m.id === selectedMachine.id
          ? {
              ...m,
              status: 'in-use',
              doorState: 'closed',
              remainingMinutes: mode.durationMinutes,
              cycleProgress: 0,
              currentMode: `${mode.name} (${mode.temperature})`,
            }
          : m
      )
    );

    setCurrentCycle(newCycle);
    clearCart();
    setActiveTab('progress');
    showNotification(`Started ${mode.name} cycle on ${selectedMachine.name}!`, 'success');
  };

  // COMPLETE CYCLE
  const completeWashCycle = () => {
    if (!currentCycle) return;

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#6366f1', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }

    const completedMachineId = currentCycle.machineId;

    // Create activity entry
    const newActivity = {
      id: `act-${Date.now()}`,
      machineId: currentCycle.machineId,
      machineName: currentCycle.machineName,
      modeId: currentCycle.mode.id,
      modeName: `${currentCycle.mode.name} (${currentCycle.mode.temperature})`,
      totalItems: currentCycle.totalCount,
      totalWeightKg: currentCycle.totalWeight,
      date: 'Just now',
      timestamp: Date.now(),
      durationMinutes: currentCycle.mode.durationMinutes,
      status: 'Completed',
      itemSummary: currentCycle.clothesSnapshot
        .map((i) => `${i.quantity} ${i.name}`)
        .slice(0, 3)
        .join(', '),
    };

    // Update machine back to AVAILABLE with OPEN DOOR!
    setMachines((prev) =>
      prev.map((m) =>
        m.id === completedMachineId
          ? {
              ...m,
              status: 'available',
              doorState: 'open',
              remainingMinutes: 0,
              cycleProgress: 0,
              currentMode: null,
            }
          : m
      )
    );

    setActivityHistory((prev) => [newActivity, ...prev]);
    setCurrentCycle((prev) => ({
      ...prev,
      stage: 'Complete',
      progress: 100,
      remainingSeconds: 0,
    }));

    showNotification(`Laundry finished on ${currentCycle.machineName}! Ready for pickup.`, 'success');
  };

  // Fast forward / finish now
  const finishCycleNow = () => {
    completeWashCycle();
  };

  // Reset / cancel cycle
  const cancelWashCycle = () => {
    if (!currentCycle) return;
    const mId = currentCycle.machineId;

    setMachines((prev) =>
      prev.map((m) =>
        m.id === mId
          ? {
              ...m,
              status: 'available',
              doorState: 'open',
              remainingMinutes: 0,
              cycleProgress: 0,
              currentMode: null,
            }
          : m
      )
    );

    setCurrentCycle(null);
    showNotification('Washing cycle canceled.', 'info');
  };

  // Close cycle screen & return to machines
  const dismissCompletedCycle = () => {
    setCurrentCycle(null);
    setSelectedMachineId(null);
    setActiveTab('machines');
  };

  // Reset all simulation to fresh defaults
  const resetDemoData = () => {
    setMachines(INITIAL_MACHINES);
    setSelectedMachineId(null);
    setCartItems([]);
    setCurrentCycle(null);
    setActivityHistory(INITIAL_ACTIVITY);
    setActiveTab('machines');
    showNotification('Reset all machines and demo state to defaults.', 'info');
  };

  // Timer loop for active simulation
  useEffect(() => {
    if (!currentCycle || currentCycle.stage === 'Complete' || currentCycle.isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentCycle((prev) => {
        if (!prev || prev.stage === 'Complete' || prev.isPaused) return prev;

        const nextRemaining = Math.max(0, prev.remainingSeconds - 1);
        const elapsed = prev.totalSeconds - nextRemaining;
        const progress = Math.min(100, Math.round((elapsed / prev.totalSeconds) * 100));

        // Stages: 0-40% Washing, 41-75% Rinsing, 76-99% Spinning, 100% Complete
        let stage = 'Washing';
        if (progress >= 100) {
          stage = 'Complete';
        } else if (progress >= 75) {
          stage = 'Spinning';
        } else if (progress >= 40) {
          stage = 'Rinsing';
        }

        // Also update machine progress in machines list
        setMachines((currMachines) =>
          currMachines.map((m) =>
            m.id === prev.machineId
              ? {
                  ...m,
                  cycleProgress: progress,
                  remainingMinutes: Math.max(1, Math.round(((100 - progress) / 100) * prev.mode.durationMinutes)),
                }
              : m
          )
        );

        if (nextRemaining === 0) {
          // Trigger completion!
          setTimeout(() => {
            completeWashCycle();
          }, 300);
          return {
            ...prev,
            remainingSeconds: 0,
            progress: 100,
            stage: 'Complete',
          };
        }

        return {
          ...prev,
          remainingSeconds: nextRemaining,
          progress,
          stage,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentCycle?.id, currentCycle?.isPaused, currentCycle?.stage]);

  const value = {
    activeTab,
    setActiveTab,
    machines,
    setMachines,
    selectedMachineId,
    selectedMachine,
    selectMachine,
    clearSelectedMachine,
    selectedMachineForModal,
    setSelectedMachineForModal,
    cartItems,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    loadPresetDemoClothes,
    recommendation,
    currentCycle,
    setCurrentCycle,
    startWashCycle,
    completeWashCycle,
    finishCycleNow,
    cancelWashCycle,
    dismissCompletedCycle,
    activityHistory,
    resetDemoData,
    notification,
    showNotification,
  };

  return <LaundryContext.Provider value={value}>{children}</LaundryContext.Provider>;
}

export function useLaundry() {
  const ctx = useContext(LaundryContext);
  if (!ctx) throw new Error('useLaundry must be used within LaundryProvider');
  return ctx;
}

