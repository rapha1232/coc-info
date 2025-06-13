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
