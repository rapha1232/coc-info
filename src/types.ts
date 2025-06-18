// Resource and building types
export type ResourceType = "gold" | "elixir" | "dark elixir" | "gems";
export type BuildingType = "defense" | "resource" | "walls" | "trap";
export type EntityType =
  | "defense"
  | "resource"
  | "walls"
  | "trap"
  | "troop"
  | "spell"
  | "siege"
  | "hero";

// Base interface for common properties
export interface BaseEntity {
  type:
    | EntityType
    | {
        default: EntityType;
        upgraded: EntityType;
      };
  uses:
    | ResourceType
    | {
        default: ResourceType;
        upgraded: ResourceType;
      };
  gearUp?: GearUpData;
  maxLevelByTownhall: number[];
  maxCountByTownhall: number[];
}

export interface GearUpData {
  cost: number;
  time: number;
  count: number;
  requiredLevel: number;
}

// Standard building/trap/entity interface
export interface StandardEntity extends BaseEntity {
  type: EntityType;
  uses: ResourceType;
  cost: number[];
  time: number[];
  possibleCountRemovedForMerge?: number[];
}

// Builder's Hut special case
export interface BuildersHut extends BaseEntity {
  type: {
    default: "resource";
    upgraded: "defense";
  };
  uses: {
    default: "gems";
    upgraded: "gold";
  };
  upgradeBehavior: {
    baseCosts: number[];
    upgradedCosts: number[];
    upgradedTimes: number[];
    unlocksAtTH: number;
  };
}

// Crafting Station module interface
export interface CraftingStationModule {
  name: string;
  uses: ResourceType;
  cost: number[];
  time: number[];
}

// Crafting Station mode interface
export interface CraftingStationMode {
  uses: ResourceType;
  gearUp: boolean;
  maxLevelByTownhall: number[];
  maxCountByTownhall: number[];
  modules: CraftingStationModule[];
}

// Crafting Station interface
export interface CraftingStation extends BaseEntity {
  type: "defense";
  uses: ResourceType;
  cost: number[];
  time: number[];
  modes: {
    "Hook Tower": CraftingStationMode;
    "Flame Spinner": CraftingStationMode;
    "Crusher Mortar": CraftingStationMode;
  };
}

// Union type for all entity data
export type EntityData = StandardEntity | BuildersHut | CraftingStation;
export type DataStructure = Record<string, EntityData>;

// Legacy interface for backward compatibility
export interface EntityInfo {
  max: number;
  count: number;
  canGear?: boolean;
}

export interface LegacyEntityData {
  type: string;
  uses?: string;
  gearUp?: boolean;
  infoByTownhall: Record<number, EntityInfo>;
}
