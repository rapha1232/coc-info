declare module "coc-max-levels" {
  interface EntityInfoArrays {
    max: number[];
    count: number[];
    possibleRemoved?: number[];
    canGear?: boolean[];
  }

  interface EntityData {
    type: string;
    uses?: string;
    gearUp?: boolean;
    infoByTownhall: EntityInfoArrays;
  }

  // Main exported functions
  export function getMaxLevel(
    entityName: string,
    thLevel: number,
  ): number | null;
  export function getCount(entityName: string, thLevel: number): number | null;
  export function getType(entityName: string): string | null;
  export function getUses(entityName: string): string | null;
  export function getGear(entityName: string): boolean | null;
  export function getPossibleRemoved(
    entityName: string,
    thLevel: number,
  ): number | null;
  export function canGearUp(
    entityName: string,
    thLevel: number,
  ): boolean | null;

  // The transformed data structure
  export const data: Record<string, EntityData>;
  export const entityNames: string[];

  // Legacy types for backward compatibility
  namespace Legacy {
    interface EntityInfo {
      max: number;
      count: number;
      canGear?: boolean;
    }

    interface EntityData {
      type: string;
      uses?: string;
      gearUp?: boolean;
      infoByTownhall: Record<number, EntityInfo>;
    }
  }
}
