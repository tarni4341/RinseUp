import { WASH_MODES } from './defaultData';

/**
 * Intelligent frontend rule-based recommendation engine for WashWise.
 * Analyzes items, fabrics, counts, weight, and machine capacity.
 */
export function analyzeLaundryLoad(cartItems, selectedMachine) {
  if (!cartItems || cartItems.length === 0) {
    return {
      recommendedMode: WASH_MODES.find((m) => m.id === 'normal'),
      reasonTitle: 'Default Everyday Clean',
      reasons: ['No clothing items currently in cart.'],
      warnings: [],
      fabricBreakdown: {},
      totalWeight: 0,
      totalCount: 0,
      isOverweight: false,
      alternatives: WASH_MODES.filter((m) => m.id !== 'normal'),
    };
  }

  let totalWeight = 0;
  let totalCount = 0;
  const categoryCounts = {};
  const fabricWeights = {
    delicate: 0,
    heavy: 0,
    sportswear: 0,
    cotton: 0,
    bedding: 0,
    mixed: 0,
  };

  const itemNames = [];

  cartItems.forEach((item) => {
    const qty = item.quantity || 0;
    const weight = (item.weightKg || 0.2) * qty;
    totalWeight += weight;
    totalCount += qty;

    categoryCounts[item.id] = (categoryCounts[item.id] || 0) + qty;
    const fabric = item.fabricType || 'mixed';
    if (fabricWeights[fabric] !== undefined) {
      fabricWeights[fabric] += weight;
    } else {
      fabricWeights.mixed += weight;
    }

    if (qty > 0) {
      itemNames.push(`${qty}× ${item.name}`);
    }
  });

  const delicateWeight = fabricWeights.delicate;
  const heavyWeight = fabricWeights.heavy;
  const sportswearWeight = fabricWeights.sportswear;
  const beddingWeight = fabricWeights.bedding;
  const cottonWeight = fabricWeights.cotton;

  const delicateRatio = totalWeight > 0 ? delicateWeight / totalWeight : 0;
  const heavyRatio = totalWeight > 0 ? heavyWeight / totalWeight : 0;
  const sportRatio = totalWeight > 0 ? sportswearWeight / totalWeight : 0;
  const beddingRatio = totalWeight > 0 ? beddingWeight / totalWeight : 0;
  const cottonRatio = totalWeight > 0 ? cottonWeight / totalWeight : 0;

  const warnings = [];
  let recommendedId = 'normal';
  let reasonTitle = 'Balanced Everyday Cycle';
  const reasons = [];

  // Capacity check
  const machineCap = selectedMachine?.capacity || 7.0;
  const isOverweight = totalWeight > machineCap;
  if (isOverweight) {
    const excess = (totalWeight - machineCap).toFixed(1);
    warnings.push({
      type: 'overweight',
      message: `Load exceeds ${selectedMachine?.name || 'machine'} limit by ${excess} kg. Reduce items or switch to a higher capacity machine.`,
    });
  }

  // Safety conflict: Delicates mixed with Heavy items (like Jeans/Towels)
  if (delicateWeight > 0 && heavyWeight > 0) {
    warnings.push({
      type: 'separation_tip',
      message: `Mixed load alert: Delicates (${(delicateWeight).toFixed(1)} kg) washed with coarse denim/towels (${(heavyWeight).toFixed(1)} kg) can cause snagging. We have dialed down the spin to 600 RPM for safety, but consider separating into two loads for optimal garment lifespan.`,
    });
  }

  // Decision Logic
  // 1. Bedding presence (bedsheets are bulky, require high water level and deep soaking)
  if (categoryCounts['bedsheets'] >= 1 || beddingRatio >= 0.35) {
    recommendedId = 'bedding';
    reasonTitle = 'Bedding & Linen Deep Soak';
    reasons.push(
      `Detected bulky linen items (${categoryCounts['bedsheets'] || 1} bedsheet${categoryCounts['bedsheets'] > 1 ? 's' : ''}) requiring maximum water submersion to prevent tangling.`,
      `Sanitizing 60°C temperature eliminates dust mites and hostel allergens thoroughly.`,
      `Gentle 1000 RPM intermediate spin protects sheet seams while balancing the drum.`
    );
  }
  // 2. Sensitive / Delicate dominant OR delicates present in mixed light load
  else if (delicateRatio >= 0.28 || (delicateWeight > 0 && heavyWeight === 0 && sportRatio < 0.3)) {
    recommendedId = 'delicate';
    reasonTitle = 'Ultra-Gentle Fabric Shield';
    reasons.push(
      `Detected delicate items (sweaters, silk, or innerwear) that would stretch or pill under standard spin.`,
      `Low 30°C temperature protects elasticity and prevents fiber shrinkage.`,
      `Gentle 600 RPM spin and high-cushion water level minimizes drum abrasion.`
    );
  }
  // 3. Heavy Duty (jeans, towels, hoodies dominant)
  else if (heavyRatio >= 0.4 || (heavyWeight >= 1.4 && delicateWeight === 0)) {
    recommendedId = 'heavy';
    reasonTitle = 'High-Power Denim & Heavy Garment Wash';
    reasons.push(
      `Substantial denim, bath towels, or heavy fleece hoodies detected (${(heavyWeight).toFixed(1)} kg).`,
      `1400 RPM spin expels heavy water absorbed by thick cotton terrycloth & denim.`,
      `50°C wash provides intense agitation to break down deep fabric grime.`
    );
  }
  // 4. Sportswear dominant
  else if (sportRatio >= 0.45) {
    recommendedId = 'sportswear';
    reasonTitle = 'Activewear Odor & Fiber Defense';
    reasons.push(
      `High proportion of technical sportswear and synthetic moisture-wicking fabrics detected.`,
      `Preserves spandex elasticity and breathable micro-mesh membranes without fabric softener buildup.`,
      `Specialized 30°C temperature neutralizes perspiration odor effectively.`
    );
  }
  // 5. Small light daily load -> Quick Wash
  else if (totalWeight <= 1.6 && totalCount <= 5 && heavyWeight === 0 && delicateWeight === 0) {
    recommendedId = 'quick';
    reasonTitle = 'Quick Express Refresh';
    reasons.push(
      `Compact light load (${totalCount} items, ${totalWeight.toFixed(1)} kg) doesn't require a full 50-minute cycle.`,
      `Saves up to 45% water and 60% electricity in hostel laundry rooms.`,
      `Ready in just 25 minutes so you can get back to studying or class.`
    );
  }
  // 6. Cotton dominant
  else if (cottonRatio >= 0.45 || (categoryCounts['tshirt'] || 0) + (categoryCounts['shirt'] || 0) >= 4) {
    recommendedId = 'cotton';
    reasonTitle = 'Cotton Deep Clean & Hygiene';
    reasons.push(
      `Primary load consists of everyday cotton t-shirts, shirts, and socks.`,
      `60°C temperature provides thorough hygienic cleaning and color revitalization.`,
      `1200 RPM spin ensures quick hostel drying rack turnaround.`
    );
  }
  // 7. General Normal Wash
  else {
    recommendedId = 'normal';
    reasonTitle = 'Balanced Everyday Multi-Fabric Wash';
    reasons.push(
      `Standard mixed fabric load (${totalCount} items, ${totalWeight.toFixed(1)} kg) suitable for everyday care.`,
      `40°C temperature removes dirt effectively while preserving colors across casual garments.`,
      `1200 RPM spin leaves clothes with minimal residual moisture.`
    );
  }

  const recommendedMode = WASH_MODES.find((m) => m.id === recommendedId) || WASH_MODES[1];
  const alternatives = WASH_MODES.filter((m) => m.id !== recommendedId);

  return {
    recommendedMode,
    reasonTitle,
    reasons,
    warnings,
    fabricWeights,
    totalWeight: Number(totalWeight.toFixed(2)),
    totalCount,
    isOverweight,
    alternatives,
    itemSummaryText: itemNames.slice(0, 4).join(', ') + (itemNames.length > 4 ? ` + ${itemNames.length - 4} more` : ''),
  };
}

