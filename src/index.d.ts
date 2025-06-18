import type {
    BuildersHut,
    CraftingStation,
    CraftingStationMode,
    CraftingStationModule,
    DataStructure,
    EntityData,
    EntityType,
    GearUpData,
    ResourceType,
    StandardEntity,
} from "./types";

export type {
    BuildersHut,
    CraftingStation,
    CraftingStationMode,
    CraftingStationModule,
    DataStructure,
    EntityData,
    EntityType,
    GearUpData,
    ResourceType,
    StandardEntity
};

export const data: DataStructure;
export const entityNames: string[];

export function getMaxLevel(
  entityName: string,
  townhallLevel: number,
): number | null;
export function getCount(
  entityName: string,
  townhallLevel: number,
): number | null;
export function getType(entityName: string, level?: number): string | null;
export function getUses(entityName: string, level?: number): string | null;
export function getGear(entityName: string): boolean | null;
export function getPossibleRemoved(
  entityName: string,
  townhallLevel: number,
): number | null;
export function getCost(
  entityName: string,
  level: number,
  hutNumber?: number,
): number | null;
export function getTime(entityName: string, level: number): number | null;
export function isUpgraded(entityName: string, level: number): boolean;
export function getCraftingModes(): Array<keyof CraftingStation["modes"]>;
export function getModuleUpgradeCost(
  mode: keyof CraftingStation["modes"],
  moduleName: string,
  level: number,
): number | null;
export function getModuleUpgradeTime(
  mode: keyof CraftingStation["modes"],
  moduleName: string,
  level: number,
): number | null;
export function getCraftingModeModules(
  mode: keyof CraftingStation["modes"],
): string[];
export function getCraftingModeMaxLevel(
  mode: keyof CraftingStation["modes"],
  townhallLevel: number,
): number | null;
export function getCraftingModeCount(
  mode: keyof CraftingStation["modes"],
  townhallLevel: number,
): number | null;
export function formatBuildTime(seconds: number): string;
export function getEntityNames(): string[];
export function getEntitiesByType(type: string): string[];
export function getEntitiesByResource(resource: string): string[];
export function getEntitiesAtTownhall(townhallLevel: number): string[];
export function getTotalCostToMax(
  entityName: string,
  townhallLevel: number,
): number | null;
export function getTotalTimeToMax(
  entityName: string,
  townhallLevel: number,
): number | null;
export function isAvailableAtTownhall(
  entityName: string,
  townhallLevel: number,
): boolean;
export function getUnlockTownhall(entityName: string): number | null;
export function getGearUpData(entityName: string): GearUpData | null;
export function getGearUpCost(entityName: string): number | null;
export function getGearUpTime(entityName: string): number | null;
export function getGearUpCount(entityName: string): number | null;
export function getGearUpRequiredLevel(entityName: string): number | null;
export function canGearUpAtLevel(entityName: string, currentLevel: number): boolean;
