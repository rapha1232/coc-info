export interface LevelData {
  [key: string]: number; // Explicitly say values are numbers
}

export interface EntityData {
  [entityName: string]: LevelData;
}
