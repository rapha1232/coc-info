# Clash of Clans Max Levels

[![npm version](https://img.shields.io/npm/v/coc-max-levels.svg)](https://www.npmjs.com/package/coc-max-levels)
[![License](https://img.shields.io/badge/license-8A2BE2)](https://github.com/rapha1232/coc-max-levels/blob/main/LICENSE)

A utility package that provides maximum levels for Clash of Clans buildings, heroes, troops, and spells based on Town Hall or Laboratory levels.

## Installation

```bash
npm install coc-max-levels
# or
yarn add coc-max-levels
# or
pnpm add coc-max-levels

```

## Usage

```typescript
import { getMaxLevel, getLabLevel } from "coc-max-levels";

// For buildings (TH dependent)
const maxCannonLevel = getMaxLevel("Cannon", 12); // TH12

// For heroes (TH dependent)
const maxKingLevel = getMaxLevel("Barbarian King", 10); // TH10

// For troops/spells (Lab dependent)
const labLevel = getLabLevel(11); // TH11 → Lab 9
const maxBarbLevel = getMaxLevel("Barbarian", labLevel);
const maxLightningLevel = getMaxLevel("Lightning Spell", labLevel);
```

## Direct Data Usage

```typescript
import { data } from "coc-max-levels";

// Access raw data
console.log(data["Cannon"]);
/*
{
  "1": 2,
  "2": 3,
  ...
  "16": 18
}
*/
```

## Available Entity Names

```typescript
import { entityNames } from "coc-max-levels";

console.log(entityNames);
// ['Town Hall', 'Cannon', 'Barbarian King', ...]
```

## API Reference

```typescript
getMaxLevel(entityName: string, level: number): number | null
```

Returns the maximum level for a given entity at the specified Town Hall.

#### Parameters:

- entityName: Name of the building, hero, troop, or spell, pet.

- level: Town Hall level.

#### Returns:

- **number** Maximum level if entity found.
- **null** otherwise.

```typescript
data: Record<string, Record<string, number>>;
```

- Raw data object containing all entities and their levels.

```typescript
entityNames: string[]
```

- Array of all available entity names.

## Data Structure

The package uses the following data format:

```typescript
{
  "Entity Name": {
    "1": level at Townhall 1,
    "2": level at Townhall 2,
    ...
    "16": level at Townhall 16
  }
}
```

## Examples

Get All Max Levels for TH13

```typescript
import { getMaxLevel, entityNames, getLabLevel } from "coc-max-levels";

const thLevel = 13;
const labLevel = getLabLevel(thLevel);

const allLevels = entityNames.reduce((acc, name) => {
  acc[name] = getMaxLevel(
    name,
    name.includes("Spell") || !name.includes(" ") ? labLevel : thLevel,
  );
  return acc;
}, {});

console.log(allLevels);
```

## Updating Data

Edit src/data.ts to update entity levels. Follow the existing format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
