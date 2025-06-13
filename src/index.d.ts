declare module "coc-max-levels" {
  export function getMaxLevel(entityName: string, level: number): number | null;
  export function getLabLevel(thLevel: number): number;

  export const data: Record<string, Record<string, number>>;
  export const entityNames: string[];
}
