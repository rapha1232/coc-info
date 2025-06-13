import data from "./data.json";

type EntityData = {
  type: string;
  uses?: string; // Optional for troops/resources
  gearUp?: boolean; // Optional for defenses
  infoByTownhall: Record<
    number,
    {
      max: number;
      count: number;
      canGear?: boolean; // Optional for gearable defenses
    }
  >;
};

type DataStructure = Record<string, EntityData>;

// Type assertion for the imported data
export const typedData = data as DataStructure;

export function getMaxLevel(entityName: string, level: number): number | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  const thInfo = entityData.infoByTownhall[level];
  return thInfo?.max ?? null;
}

export function getCount(entityName: string, level: number): number | null {
  const entityData = typedData[entityName];
  if (!entityData) return null;

  const thInfo = entityData.infoByTownhall[level];
  return thInfo?.count ?? null;
}

export function getType(entityName: string): string | null {
  const entityData = typedData[entityName];
  return entityData?.type ?? null;
}

export function getGear(entityName: string): boolean | null {
  const entityData = typedData[entityName];
  return entityData?.gearUp ?? null;
}

export function getLabLevelFromTH(townhallLevel: number): number {
  const thToLabMap: Record<number, number> = {
    1: 0,
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    11: 9,
    12: 10,
    13: 11,
    14: 12,
    15: 13,
    16: 14,
    17: 15,
  };
  return thToLabMap[townhallLevel] || 1;
}

export const entityNames = Object.keys(typedData);

module.exports = {
  getMaxLevel,
  getCount,
  getType,
  getGear,
  getLabLevelFromTH,
  data: typedData,
  entityNames,
};
