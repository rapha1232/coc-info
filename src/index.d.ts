declare module "coc-max-levels" {
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

  export function getMaxLevel(
    entityName: string,
    thLevel: number,
  ): number | null;
  export function getCount(entityName: string, thLevel: number): number | null;
  export function getType(entityName: string): string | null;
  export function getGear(entityName: string): boolean | null;
  export function canGearUp(
    entityName: string,
    thLevel: number,
  ): boolean | null;
  export function getLabLevelFromTH(thLevel: number): number;

  export const data: Record<string, EntityData>;
  export const entityNames: string[];
}
