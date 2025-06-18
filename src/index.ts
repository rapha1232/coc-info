import {
  canGearUpAtLevel,
  formatBuildTime,
  getCost,
  getCount,
  getCraftingModeCount,
  getCraftingModeMaxLevel,
  getCraftingModeModules,
  getCraftingModes,
  getEntitiesAtTownhall,
  getEntitiesByResource,
  getEntitiesByType,
  getEntityNames,
  getGear,
  getGearUpCost,
  getGearUpCount,
  getGearUpData,
  getGearUpRequiredLevel,
  getGearUpTime,
  getMaxLevel,
  getModuleUpgradeCost,
  getModuleUpgradeTime,
  getPossibleRemoved,
  getTime,
  getTotalCostToMax,
  getTotalTimeToMax,
  getType,
  getUnlockTownhall,
  getUses,
  isAvailableAtTownhall,
  isUpgraded,
  typedData,
  type DataStructure,
  type EntityData,
} from "./utils/index";

// Re-export all functions
export {
  canGearUpAtLevel,
  typedData as data, formatBuildTime, getCost, getCount, getCraftingModeCount, getCraftingModeMaxLevel, getCraftingModeModules, getCraftingModes, getEntitiesAtTownhall, getEntitiesByResource, getEntitiesByType, getEntityNames, getGear, getGearUpCost, getGearUpCount, getGearUpData, getGearUpRequiredLevel, getGearUpTime, getMaxLevel, getModuleUpgradeCost,
  getModuleUpgradeTime, getPossibleRemoved, getTime, getTotalCostToMax,
  getTotalTimeToMax, getType, getUnlockTownhall, getUses, isAvailableAtTownhall, isUpgraded
};

// Re-export types
  export type { DataStructure, EntityData };

// Legacy exports for backward compatibility
export const entityNames = getEntityNames();

// CommonJS export for backward compatibility
module.exports = {
  getCount,
  getGear,
  getMaxLevel,
  getType,
  getUses,
  getPossibleRemoved,
  getCost,
  getTime,
  isUpgraded,
  getCraftingModes,
  getModuleUpgradeCost,
  getModuleUpgradeTime,
  getCraftingModeModules,
  getCraftingModeMaxLevel,
  getCraftingModeCount,
  formatBuildTime,
  getEntityNames,
  getEntitiesByType,
  getEntitiesByResource,
  getEntitiesAtTownhall,
  getTotalCostToMax,
  getTotalTimeToMax,
  isAvailableAtTownhall,
  getUnlockTownhall,
  getGearUpData,
  getGearUpCost,
  getGearUpTime,
  getGearUpCount,
  getGearUpRequiredLevel,
  canGearUpAtLevel,
  data: typedData,
  entityNames,
};
