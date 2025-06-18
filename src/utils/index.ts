import data from "../data.json";
import {
  BuildersHut,
  CraftingStation,
  DataStructure,
  EntityData,
  GearUpData,
  StandardEntity,
} from "../types";

export const typedData = data as DataStructure;

// Re-export types for external use
export type { DataStructure, EntityData };

/**
 * Type guards for different entity types
 */
export function isStandardEntity(entity: EntityData): entity is StandardEntity {
  return "cost" in entity && "time" in entity && !("upgradeBehavior" in entity);
}

export function isBuildersHut(entity: EntityData): entity is BuildersHut {
  return "upgradeBehavior" in entity;
}

export function isCraftingStation(
  entity: EntityData,
): entity is CraftingStation {
  return "modes" in entity;
}

/**
 * Get the cost for upgrading an entity to a specific level
 */
export function getCost(
  entityName: string,
  level: number,
  hutNumber: number = 1,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  if (isBuildersHut(entityData)) {
    if (level === 1) {
      return entityData.upgradeBehavior?.baseCosts?.[hutNumber - 1] ?? null;
    } else {
      return entityData.upgradeBehavior?.upgradedCosts?.[level - 2] ?? null;
    }
  } else if (isStandardEntity(entityData) || isCraftingStation(entityData)) {
    return entityData.cost?.[level - 1] ?? null;
  }

  return null;
}

/**
 * Get the upgrade time for an entity to a specific level
 */
export function getTime(entityName: string, level: number): number | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  if (isBuildersHut(entityData)) {
    if (level === 1) return 0; // Instant for gem purchase
    return entityData.upgradeBehavior?.upgradedTimes?.[level - 2] ?? null;
  } else if (isStandardEntity(entityData) || isCraftingStation(entityData)) {
    return entityData.time?.[level - 1] ?? null;
  }

  return null;
}

/**
 * Check if an entity is upgraded (for Builder's Hut)
 */
export function isUpgraded(entityName: string, level: number): boolean {
  return entityName === "Builder's Hut" && level >= 2;
}

/**
 * Get the type of an entity at a specific level
 */
export function getType(entityName: string, level: number = 1): string | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  if (typeof entityData.type === "string") {
    return entityData.type;
  } else {
    return isUpgraded(entityName, level)
      ? entityData.type.upgraded
      : entityData.type.default;
  }
}

/**
 * Get the resource type used by an entity at a specific level
 */
export function getUses(entityName: string, level: number = 1): string | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  if (typeof entityData.uses === "string") {
    return entityData.uses;
  } else {
    return isUpgraded(entityName, level)
      ? entityData.uses.upgraded
      : entityData.uses.default;
  }
}

/**
 * Get the maximum level for an entity at a specific town hall level
 */
export function getMaxLevel(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.maxLevelByTownhall) return null;

  const index = townhallLevel - 1;
  return entityData.maxLevelByTownhall[index] ?? null;
}

/**
 * Get the maximum count for an entity at a specific town hall level
 */
export function getCount(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.maxCountByTownhall) return null;

  const index = townhallLevel - 1;
  return entityData.maxCountByTownhall[index] ?? null;
}

/**
 * Get the gear up status for an entity
 */
export function getGear(entityName: string): boolean | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  return entityData.gearUp ? true : null;
}

/**
 * Get the gear up data for an entity
 */
export function getGearUpData(entityName: string): GearUpData | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.gearUp) return null;

  return entityData.gearUp;
}

/**
 * Get the gear up cost for an entity
 */
export function getGearUpCost(entityName: string): number | null {
  const gearUpData = getGearUpData(entityName);
  return gearUpData?.cost ?? null;
}

/**
 * Get the gear up time for an entity
 */
export function getGearUpTime(entityName: string): number | null {
  const gearUpData = getGearUpData(entityName);
  return gearUpData?.time ?? null;
}

/**
 * Get the gear up count for an entity
 */
export function getGearUpCount(entityName: string): number | null {
  const gearUpData = getGearUpData(entityName);
  return gearUpData?.count ?? null;
}

/**
 * Get the required level for gear up for an entity
 */
export function getGearUpRequiredLevel(entityName: string): number | null {
  const gearUpData = getGearUpData(entityName);
  return gearUpData?.requiredLevel ?? null;
}

/**
 * Check if an entity can be geared up at a specific level
 */
export function canGearUpAtLevel(entityName: string, currentLevel: number): boolean {
  const requiredLevel = getGearUpRequiredLevel(entityName);
  if (requiredLevel === null) return false;
  
  return currentLevel >= requiredLevel;
}

/**
 * Get the possible count removed for merge at a specific town hall level
 */
export function getPossibleRemoved(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (
    !isStandardEntity(entityData) ||
    !entityData.possibleCountRemovedForMerge
  ) {
    return null;
  }

  const index = townhallLevel - 1;
  return entityData.possibleCountRemovedForMerge[index] ?? null;
}

/**
 * Get all available crafting modes for the Crafting Station
 */
export function getCraftingModes(): Array<keyof CraftingStation["modes"]> {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  return station
    ? (Object.keys(station.modes) as Array<keyof CraftingStation["modes"]>)
    : [];
}

/**
 * Get the upgrade cost for a specific module in a crafting mode
 */
export function getModuleUpgradeCost(
  mode: keyof CraftingStation["modes"],
  moduleName: string,
  level: number,
): number | null {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  if (!station) return null;

  const modeData = station.modes[mode];
  const module = modeData.modules.find((m) => m.name === moduleName);
  return module?.cost[level - 1] ?? null;
}

/**
 * Get the upgrade time for a specific module in a crafting mode
 */
export function getModuleUpgradeTime(
  mode: keyof CraftingStation["modes"],
  moduleName: string,
  level: number,
): number | null {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  if (!station) return null;

  const modeData = station.modes[mode];
  const module = modeData.modules.find((m) => m.name === moduleName);
  return module?.time[level - 1] ?? null;
}

/**
 * Get all available modules for a specific crafting mode
 */
export function getCraftingModeModules(
  mode: keyof CraftingStation["modes"],
): string[] {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  if (!station) return [];

  const modeData = station.modes[mode];
  return modeData.modules.map((m) => m.name);
}

/**
 * Get the maximum level for a crafting mode at a specific town hall level
 */
export function getCraftingModeMaxLevel(
  mode: keyof CraftingStation["modes"],
  townhallLevel: number,
): number | null {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  if (!station) return null;

  const modeData = station.modes[mode];
  const index = townhallLevel - 1;
  return modeData.maxLevelByTownhall[index] ?? null;
}

/**
 * Get the maximum count for a crafting mode at a specific town hall level
 */
export function getCraftingModeCount(
  mode: keyof CraftingStation["modes"],
  townhallLevel: number,
): number | null {
  const station = typedData["Crafting Station"] as CraftingStation | undefined;
  if (!station) return null;

  const modeData = station.modes[mode];
  const index = townhallLevel - 1;
  return modeData.maxCountByTownhall[index] ?? null;
}

/**
 * Format build time in seconds to a human-readable string
 */
export function formatBuildTime(seconds: number): string {
  if (seconds === 0) return "0s";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (
    [
      days > 0 ? `${days}d` : "",
      hours > 0 ? `${hours}h` : "",
      minutes > 0 ? `${minutes}m` : "",
    ]
      .filter(Boolean)
      .join(" ") || "0s"
  );
}

/**
 * Get all entity names
 */
export function getEntityNames(): string[] {
  return Object.keys(typedData);
}

/**
 * Get entities by type
 */
export function getEntitiesByType(type: string): string[] {
  return getEntityNames().filter((name) => getType(name) === type);
}

/**
 * Get entities that use a specific resource
 */
export function getEntitiesByResource(resource: string): string[] {
  return getEntityNames().filter((name) => getUses(name) === resource);
}

/**
 * Get entities available at a specific town hall level
 */
export function getEntitiesAtTownhall(townhallLevel: number): string[] {
  return getEntityNames().filter((name) => {
    const count = getCount(name, townhallLevel);
    return count !== null && count > 0;
  });
}

/**
 * Get the total cost to max out an entity at a specific town hall level
 */
export function getTotalCostToMax(
  entityName: string,
  townhallLevel: number,
): number | null {
  const maxLevel = getMaxLevel(entityName, townhallLevel);
  if (maxLevel === null || maxLevel === 0) return null;

  let totalCost = 0;
  for (let level = 1; level <= maxLevel; level++) {
    const cost = getCost(entityName, level);
    if (cost === null) return null;
    totalCost += cost;
  }

  return totalCost;
}

/**
 * Get the total time to max out an entity at a specific town hall level
 */
export function getTotalTimeToMax(
  entityName: string,
  townhallLevel: number,
): number | null {
  const maxLevel = getMaxLevel(entityName, townhallLevel);
  if (maxLevel === null || maxLevel === 0) return null;

  let totalTime = 0;
  for (let level = 1; level <= maxLevel; level++) {
    const time = getTime(entityName, level);
    if (time === null) return null;
    totalTime += time;
  }

  return totalTime;
}

/**
 * Check if an entity is available at a specific town hall level
 */
export function isAvailableAtTownhall(
  entityName: string,
  townhallLevel: number,
): boolean {
  const count = getCount(entityName, townhallLevel);
  return count !== null && count > 0;
}

/**
 * Get the town hall level where an entity first becomes available
 */
export function getUnlockTownhall(entityName: string): number | null {
  for (let th = 1; th <= 17; th++) {
    if (isAvailableAtTownhall(entityName, th)) {
      return th;
    }
  }
  return null;
}
