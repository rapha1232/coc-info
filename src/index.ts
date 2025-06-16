import data from "./data.json";

type EntityData = {
  type: string;
  uses?: string; // Optional for troops/resources
  gearUp?: boolean; // Optional for defenses
  infoByTownhall: {
    max: number[];
    count: number[];
    possibleRemoved?: number[]; // Optional field
    canGear?: boolean[]; // Optional for gearable defenses
  };
};

type DataStructure = Record<string, EntityData>;

// Type assertion for the imported data
export const typedData = data as DataStructure;

export function getMaxLevel(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.infoByTownhall?.max) return null;

  // Array is 0-indexed, townhall levels start at 1
  const index = townhallLevel - 1;
  return entityData.infoByTownhall.max[index] ?? null;
}

export function getCount(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.infoByTownhall?.count) return null;

  const index = townhallLevel - 1;
  return entityData.infoByTownhall.count[index] ?? null;
}

export function getType(entityName: string): string | null {
  const entityData = typedData[entityName];
  return entityData?.type ?? null;
}

export function getGear(entityName: string): boolean | null {
  const entityData = typedData[entityName];
  return entityData?.gearUp ?? null;
}

export function getUses(entityName: string): string | null {
  const entityData = typedData[entityName];
  return entityData?.uses ?? null;
}

export function getPossibleRemoved(
  entityName: string,
  townhallLevel: number,
): number | null {
  const entityData = typedData[entityName];
  if (!entityData || !entityData.infoByTownhall?.possibleRemoved) return null;

  const index = townhallLevel - 1;
  return entityData.infoByTownhall.possibleRemoved[index] ?? null;
}

export const entityNames = Object.keys(typedData);

// For CommonJS compatibility
module.exports = {
  getMaxLevel,
  getCount,
  getType,
  getGear,
  getUses,
  getPossibleRemoved,
  data: typedData,
  entityNames,
};
