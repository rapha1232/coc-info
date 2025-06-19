# 🏰 Clash of Clans Info

[![npm version](https://img.shields.io/npm/v/coc-info.svg)](https://www.npmjs.com/package/coc-info)
[![npm downloads](https://img.shields.io/npm/dm/coc-info.svg)](https://www.npmjs.com/package/coc-info)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rapha1232/coc-info/blob/main/LICENSE)

A comprehensive TypeScript utility package that provides maximum levels, costs, build times, and detailed information for all Clash of Clans entities including buildings, heroes, troops, spells, traps, walls, and siege machines.

## ✨ Features

- 🏗️ **Complete Coverage**: All buildings, heroes, troops, spells, pets, traps, walls, siege machines, and Town Hall weapons
- 📊 **Rich Data**: Max levels, counts, costs, build times, resource types, gear-up info, and merge data
- 🎯 **Type Safety**: Full TypeScript support with comprehensive types and interfaces
- ⚡ **Performance**: Optimized data structure for fast lookups
- 🔧 **Special Cases**: Builder's Hut upgrades, Crafting Station modes, Town Hall weapons, and merge mechanics
- 🛠️ **Utility Functions**: Advanced querying, filtering, and calculation functions

## 📦 Installation

```bash
npm install coc-info
# or
yarn add coc-info
# or
pnpm add coc-info
```

## 🚀 Quick Start

```typescript
import {
  getMaxLevel,
  getCount,
  getType,
  getUses,
  getGear,
  getCost,
  getTime,
  formatBuildTime,
  getTotalCostToMax,
  getEntitiesByType,
} from "coc-info";

// Get max level for a building at TH13
const maxCannonLevel = getMaxLevel("Cannon", 13); // 19

// Get count of buildings at TH11
const archerTowerCount = getCount("Archer Tower", 11); // 8

// Get entity type and resource usage
const cannonType = getType("Cannon"); // "defense"
const cannonResource = getUses("Cannon"); // "gold"

// Check if building can be geared up
const canGearUp = getGear("Cannon"); // true

// Get upgrade cost and time
const upgradeCost = getCost("X-Bow", 1); // 1000000
const upgradeTime = getTime("X-Bow", 1); // 43200 (seconds)
const formattedTime = formatBuildTime(upgradeTime); // "12h"

// Get total cost to max out a building
const totalCost = getTotalCostToMax("Cannon", 13); // Total cost to max Cannon at TH13

// Get all defense buildings
const defenseBuildings = getEntitiesByType("defense"); // ["Cannon", "Archer Tower", ...]
```

## 📚 API Reference

### Core Functions

#### `getMaxLevel(entityName: string, townhallLevel: number): number | null`

Returns the maximum level for an entity at the specified Town Hall level.

```typescript
getMaxLevel("Cannon", 13); // 19
getMaxLevel("Barbarian King", 10); // 40
getMaxLevel("Dragon", 12); // 7
```

#### `getCount(entityName: string, townhallLevel: number): number | null`

Returns the maximum count of an entity at the specified Town Hall level.

```typescript
getCount("Archer Tower", 11); // 8
getCount("X-Bow", 14); // 4
getCount("Barbarian King", 10); // 1
```

#### `getType(entityName: string, level?: number): string | null`

Returns the entity type. For Builder's Hut, specify the level to get the correct type.

```typescript
getType("Cannon"); // "defense"
getType("Barbarian King"); // "hero"
getType("Builder's Hut", 1); // "resource"
getType("Builder's Hut", 2); // "defense"
```

#### `getUses(entityName: string, level?: number): string | null`

Returns the resource type used by the entity.

```typescript
getUses("Cannon"); // "gold"
getUses("Gold Mine"); // "elixir"
getUses("Barbarian King"); // "dark elixir"
getUses("Builder's Hut", 1); // "gems"
getUses("Builder's Hut", 2); // "gold"
```

#### `getGear(entityName: string): boolean | null`

Returns whether the entity can be geared up.

```typescript
getGear("Cannon"); // true
getGear("Wizard Tower"); // false
getGear("Barbarian"); // null
```

#### `getGearUpData(entityName: string): GearUpData | null`

Returns the complete gear up data for an entity, including cost, time, count, and required level.

```typescript
const gearUpData = getGearUpData("Cannon");
// Returns: { cost: 1000000, time: 86400, count: 1, requiredLevel: 7 }
```

#### `getGearUpCost(entityName: string): number | null`

Returns the gear up cost for an entity.

```typescript
getGearUpCost("Cannon"); // 1000000
getGearUpCost("Wizard Tower"); // null
```

#### `getGearUpTime(entityName: string): number | null`

Returns the gear up time in seconds for an entity.

```typescript
getGearUpTime("Cannon"); // 86400 (1 day)
getGearUpTime("Wizard Tower"); // null
```

#### `getGearUpCount(entityName: string): number | null`

Returns the number of gear ups available for an entity.

```typescript
getGearUpCount("Cannon"); // 1
getGearUpCount("Wizard Tower"); // null
```

#### `getGearUpRequiredLevel(entityName: string): number | null`

Returns the required level to gear up an entity.

```typescript
getGearUpRequiredLevel("Cannon"); // 7
getGearUpRequiredLevel("Wizard Tower"); // null
```

#### `canGearUpAtLevel(entityName: string, currentLevel: number): boolean`

Checks if an entity can be geared up at a specific level.

```typescript
canGearUpAtLevel("Cannon", 7); // true
canGearUpAtLevel("Cannon", 6); // false
canGearUpAtLevel("Wizard Tower", 10); // false
```

#### `getPossibleRemoved(entityName: string, townhallLevel: number): number | null`

Returns the number of buildings that can be removed for merging at higher Town Halls.

```typescript
getPossibleRemoved("Cannon", 16); // 4
getPossibleRemoved("Cannon", 17); // 7
```

### Cost and Time Functions

#### `getCost(entityName: string, level: number, hutNumber?: number): number | null`

Returns the upgrade cost for a specific level.

```typescript
getCost("X-Bow", 1); // 1000000
getCost("Builder's Hut", 1, 1); // 0 (1st hut is free)
getCost("Builder's Hut", 1, 2); // 250 (2nd hut costs gems)
getCost("Builder's Hut", 2); // 4000000 (gold upgrade)
```

#### `getTime(entityName: string, level: number): number | null`

Returns the upgrade time in seconds.

```typescript
getTime("X-Bow", 1); // 43200 (12 hours)
getTime("Builder's Hut", 1); // 0 (instant)
getTime("Builder's Hut", 2); // 259200 (3 days)
```

#### `formatBuildTime(seconds: number): string`

Formats build time to human-readable string.

```typescript
formatBuildTime(0); // "0s"
formatBuildTime(3600); // "1h"
formatBuildTime(86400); // "1d"
formatBuildTime(90000); // "1d 1h"
```

### Advanced Calculation Functions

#### `getTotalCostToMax(entityName: string, townhallLevel: number): number | null`

Returns the total cost to max out an entity at a specific Town Hall level.

```typescript
getTotalCostToMax("Cannon", 13); // Total cost to max Cannon at TH13
getTotalCostToMax("X-Bow", 14); // Total cost to max X-Bow at TH14
```

#### `getTotalTimeToMax(entityName: string, townhallLevel: number): number | null`

Returns the total time to max out an entity at a specific Town Hall level.

```typescript
getTotalTimeToMax("Cannon", 13); // Total time to max Cannon at TH13
getTotalTimeToMax("X-Bow", 14); // Total time to max X-Bow at TH14
```

### Query and Filter Functions

#### `getEntityNames(): string[]`

Returns an array of all available entity names.

```typescript
const allEntities = getEntityNames(); // ["Cannon", "Archer Tower", "Barbarian King", ...]
```

#### `getEntitiesByType(type: string): string[]`

Returns all entities of a specific type.

```typescript
getEntitiesByType("defense"); // ["Cannon", "Archer Tower", "Mortar", ...]
getEntitiesByType("hero"); // ["Barbarian King", "Archer Queen", "Grand Warden", ...]
```

#### `getEntitiesByResource(resource: string): string[]`

Returns all entities that use a specific resource.

```typescript
getEntitiesByResource("gold"); // ["Cannon", "Archer Tower", "X-Bow", ...]
getEntitiesByResource("dark elixir"); // ["Barbarian King", "Archer Queen", ...]
```

#### `getEntitiesAtTownhall(townhallLevel: number): string[]`

Returns all entities available at a specific Town Hall level.

```typescript
getEntitiesAtTownhall(1); // ["Cannon", "Townhall", ...]
getEntitiesAtTownhall(13); // ["X-Bow", "Scattershot", "Giga Inferno TH13", ...]
```

#### `isAvailableAtTownhall(entityName: string, townhallLevel: number): boolean`

Checks if an entity is available at a specific Town Hall level.

```typescript
isAvailableAtTownhall("Cannon", 1); // true
isAvailableAtTownhall("X-Bow", 8); // false
```

#### `getUnlockTownhall(entityName: string): number | null`

Returns the Town Hall level where an entity first becomes available.

```typescript
getUnlockTownhall("Cannon"); // 1
getUnlockTownhall("X-Bow"); // 9
```

### Crafting Station Functions

#### `getCraftingModes(): string[]`

Returns available Crafting Station modes.

```typescript
getCraftingModes(); // ["Hook Tower", "Flame Spinner", "Crusher Mortar"]
```

#### `getCraftingModeModules(mode: string): string[]`

Returns all available modules for a specific crafting mode.

```typescript
getCraftingModeModules("Hook Tower"); // ["Hitpoints", "Attack Cooldown", "Stun Time"]
```

#### `getCraftingModeMaxLevel(mode: string, townhallLevel: number): number | null`

Returns the maximum level for a crafting mode at a specific Town Hall level.

```typescript
getCraftingModeMaxLevel("Hook Tower", 17); // 30
getCraftingModeMaxLevel("Hook Tower", 1); // 0
```

#### `getCraftingModeCount(mode: string, townhallLevel: number): number | null`

Returns the maximum count for a crafting mode at a specific Town Hall level.

```typescript
getCraftingModeCount("Hook Tower", 17); // 1
getCraftingModeCount("Hook Tower", 1); // 0
```

#### `getModuleUpgradeCost(mode: string, moduleName: string, level: number): number | null`

Returns the cost for upgrading a Crafting Station module.

```typescript
getModuleUpgradeCost("Hook Tower", "Hitpoints", 2); // 4000000
```

#### `getModuleUpgradeTime(mode: string, moduleName: string, level: number): number | null`

Returns the time for upgrading a Crafting Station module.

```typescript
getModuleUpgradeTime("Hook Tower", "Hitpoints", 2); // 86400 (1 day)
```

### Utility Functions

#### `isUpgraded(entityName: string, level: number): boolean`

Checks if an entity is in its upgraded state (mainly for Builder's Hut).

```typescript
isUpgraded("Builder's Hut", 1); // false
isUpgraded("Builder's Hut", 2); // true
```

### Data Access

#### `data: DataStructure`

The complete typed data object containing all entity information.

#### `entityNames: string[]`

Array of all available entity names (legacy export).

```typescript
import { entityNames } from "coc-info";
console.log(entityNames.length); // Total number of entities
```

## 🎯 Examples

### Get All Max Levels for TH13

```typescript
import { getMaxLevel, getEntityNames } from "coc-info";

const thLevel = 13;
const allLevels = getEntityNames().reduce(
  (acc, name) => {
    acc[name] = getMaxLevel(name, thLevel);
    return acc;
  },
  {} as Record<string, number | null>,
);
```

### Calculate Total Upgrade Cost

```typescript
import { getTotalCostToMax } from "coc-info";

// Get total cost to max out X-Bow at TH14
const totalXBowCost = getTotalCostToMax("X-Bow", 14);
console.log(`Total cost to max X-Bow at TH14: ${totalXBowCost}`);
```

### Get All Defense Buildings

```typescript
import { getEntitiesByType } from "coc-info";

const defenseBuildings = getEntitiesByType("defense");
console.log(defenseBuildings);
// ["Cannon", "Archer Tower", "Mortar", "Air Defense", ...]
```

### Analyze Resource Usage

```typescript
import { getEntitiesByResource, getTotalCostToMax } from "coc-info";

// Get all gold-using buildings
const goldBuildings = getEntitiesByResource("gold");

// Calculate total gold cost to max all buildings at TH13
const totalGoldCost = goldBuildings.reduce((total, building) => {
  const cost = getTotalCostToMax(building, 13);
  return total + (cost || 0);
}, 0);

console.log(`Total gold needed at TH13: ${totalGoldCost}`);
```

### Builder's Hut Analysis

```typescript
import { getCost, getTime, formatBuildTime } from "coc-info";

// Analyze all Builder's Hut costs
for (let hutNumber = 1; hutNumber <= 5; hutNumber++) {
  const gemCost = getCost("Builder's Hut", 1, hutNumber);
  console.log(`Hut ${hutNumber}: ${gemCost} gems`);
}

// Analyze upgrade costs
for (let level = 2; level <= 7; level++) {
  const goldCost = getCost("Builder's Hut", level);
  const time = getTime("Builder's Hut", level);
  console.log(`Level ${level}: ${goldCost} gold, ${formatBuildTime(time)}`);
}
```

### Crafting Station Analysis

```typescript
import {
  getCraftingModes,
  getCraftingModeModules,
  getModuleUpgradeCost,
} from "coc-info";

const modes = getCraftingModes();
console.log("Available crafting modes:", modes);

// Analyze Hook Tower modules
const hookModules = getCraftingModeModules("Hook Tower");
console.log("Hook Tower modules:", hookModules);

// Get upgrade costs for all modules
hookModules.forEach((module) => {
  const cost = getModuleUpgradeCost("Hook Tower", module, 2);
  console.log(`${module} level 2 cost: ${cost}`);
});
```

### Town Hall Progression Analysis

```typescript
import { getEntitiesAtTownhall, getUnlockTownhall } from "coc-info";

// See what's new at each Town Hall level
for (let th = 1; th <= 17; th++) {
  const entities = getEntitiesAtTownhall(th);
  console.log(`TH${th}: ${entities.length} entities available`);
}

// Find when specific buildings unlock
const buildings = ["X-Bow", "Inferno Tower", "Eagle Artillery", "Scattershot"];
buildings.forEach((building) => {
  const unlockTH = getUnlockTownhall(building);
  console.log(`${building} unlocks at TH${unlockTH}`);
});
```

### Gear Up Analysis

```typescript
import {
  getGearUpData,
  getGearUpCost,
  getGearUpTime,
  formatBuildTime,
  getEntitiesByType,
  canGearUpAtLevel,
} from "coc-info";

// Get all defense buildings that can be geared up
const defenseBuildings = getEntitiesByType("defense");
const gearUpBuildings = defenseBuildings.filter(
  (building) => getGearUpData(building) !== null,
);

console.log("Buildings that can be geared up:");
gearUpBuildings.forEach((building) => {
  const gearUpData = getGearUpData(building);
  if (gearUpData) {
    console.log(`${building}:`);
    console.log(`  Cost: ${gearUpData.cost}`);
    console.log(`  Time: ${formatBuildTime(gearUpData.time)}`);
    console.log(`  Required Level: ${gearUpData.requiredLevel}`);
    console.log(`  Count: ${gearUpData.count}`);
  }
});

// Calculate total gear up cost for all buildings
const totalGearUpCost = gearUpBuildings.reduce((total, building) => {
  const cost = getGearUpCost(building);
  return total + (cost || 0);
}, 0);

console.log(`Total gear up cost: ${totalGearUpCost}`);

// Check if specific buildings can be geared up at current level
const currentLevels = { Cannon: 8, "Archer Tower": 6, Mortar: 5 };
Object.entries(currentLevels).forEach(([building, level]) => {
  const canGear = canGearUpAtLevel(building, level);
  console.log(
    `${building} (Level ${level}): ${canGear ? "Can gear up" : "Cannot gear up"}`,
  );
});
```

## 📊 Data Structure

The package uses a comprehensive data structure with full TypeScript support:

```typescript
// Main entity types
type EntityType =
  | "defense"
  | "resource"
  | "walls"
  | "trap"
  | "troop"
  | "spell"
  | "siege"
  | "hero";
type ResourceType = "gold" | "elixir" | "dark elixir" | "gems";

// Gear up data interface
interface GearUpData {
  cost: number; // Cost to gear up
  time: number; // Time in seconds to gear up
  count: number; // Number of gear ups available
  requiredLevel: number; // Required level to gear up
}

// Standard entity interface
interface StandardEntity {
  type: EntityType;
  uses: ResourceType;
  gearUp?: GearUpData; // Gear up information (if applicable)
  maxLevelByTownhall: number[]; // Max level at each TH (1-17)
  maxCountByTownhall: number[]; // Max count at each TH (1-17)
  possibleCountRemovedForMerge?: number[]; // Buildings removed for merging
  cost: number[]; // Upgrade costs
  time: number[]; // Upgrade times in seconds
}

// Builder's Hut special case
interface BuildersHut {
  type: { default: "resource"; upgraded: "defense" };
  uses: { default: "gems"; upgraded: "gold" };
  gearUp: boolean;
  maxLevelByTownhall: number[];
  maxCountByTownhall: number[];
  upgradeBehavior: {
    baseCosts: number[]; // Gem costs for initial huts
    upgradedCosts: number[]; // Gold costs for upgrades
    upgradedTimes: number[]; // Upgrade times
    unlocksAtTH: number; // When upgrades become available
  };
}

// Crafting Station with modes
interface CraftingStation {
  type: "defense";
  uses: ResourceType;
  gearUp: boolean;
  maxLevelByTownhall: number[];
  maxCountByTownhall: number[];
  cost: number[];
  time: number[];
  modes: {
    "Hook Tower": CraftingStationMode;
    "Flame Spinner": CraftingStationMode;
    "Crusher Mortar": CraftingStationMode;
  };
}

// Union type for all entities
type EntityData = StandardEntity | BuildersHut | CraftingStation;
type DataStructure = Record<string, EntityData>;
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
git clone https://github.com/rapha1232/coc-info.git
cd coc-info
npm install
npm test
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Data sourced from official Clash of Clans game information
- Built with TypeScript for type safety and developer experience
- Comprehensive test coverage for reliability

---

⭐ **Star this repository if you find it useful!**
