import {
  canGearUpAtLevel,
  getCount,
  getCraftingModeCount,
  getCraftingModeMaxLevel,
  getCraftingModeModules,
  getCraftingModes,
  getEntitiesAtTownhall,
  getEntitiesByResource,
  getEntitiesByType,
  getEntityNames,
  getGearUpCost,
  getGearUpCount,
  getGearUpData,
  getGearUpRequiredLevel,
  getGearUpTime,
  getMaxLevel,
  getTotalCostToMax,
  getTotalTimeToMax,
  getType,
  getUnlockTownhall,
  getUses,
  isAvailableAtTownhall,
} from "../utils";

describe("New Utility Functions", () => {
  test("getEntitiesByType returns correct entities", () => {
    const defenses = getEntitiesByType("defense");
    expect(defenses).toContain("Cannon");
    expect(defenses).toContain("Archer Tower");
    expect(defenses).not.toContain("Barbarian");
  });

  test("getEntitiesByResource returns correct entities", () => {
    const goldUsers = getEntitiesByResource("gold");
    expect(goldUsers).toContain("Cannon");
    expect(goldUsers).toContain("Archer Tower");
    expect(goldUsers).not.toContain("Gold Mine");
  });

  test("getEntitiesAtTownhall returns correct entities for TH 1", () => {
    const th1 = getEntitiesAtTownhall(1);
    expect(th1).toContain("Cannon");
    expect(th1).toContain("Townhall");
    expect(th1).not.toContain("X-Bow");
  });

  test("getEntitiesAtTownhall returns correct entities for TH 13", () => {
    const th13 = getEntitiesAtTownhall(13);
    expect(th13).toContain("X-Bow");
    expect(th13).toContain("Scattershot");
  });

  test("getTotalCostToMax returns correct total for Cannon at TH 3", () => {
    // Cannon max level at TH3 is 4
    const total = getTotalCostToMax("Cannon", 3);
    // 250 + 1000 + 4000 + 16000 = 21250
    expect(total).toBe(21250);
  });

  test("getTotalTimeToMax returns correct total for Cannon at TH 3", () => {
    // Cannon max level at TH3 is 4
    const total = getTotalTimeToMax("Cannon", 3);
    // 5 + 30 + 120 + 1200 = 1355
    expect(total).toBe(1355);
  });

  test("isAvailableAtTownhall returns true/false correctly", () => {
    expect(isAvailableAtTownhall("Cannon", 1)).toBe(true);
    expect(isAvailableAtTownhall("X-Bow", 8)).toBe(false);
  });

  test("getUnlockTownhall returns correct unlock TH", () => {
    expect(getUnlockTownhall("Cannon")).toBe(1);
    expect(getUnlockTownhall("X-Bow")).toBe(9);
  });

  test("getCraftingModes returns all crafting modes", () => {
    const modes = getCraftingModes();
    expect(modes).toContain("Hook Tower");
    expect(modes).toContain("Flame Spinner");
    expect(modes).toContain("Crusher Mortar");
  });

  test("getCraftingModeModules returns correct modules for Hook Tower", () => {
    const modules = getCraftingModeModules("Hook Tower");
    expect(modules).toContain("Hitpoints");
    expect(modules).toContain("Attack Cooldown");
    expect(modules).toContain("Stun Time");
  });

  test("getCraftingModeMaxLevel returns correct max level", () => {
    // At TH 17, Hook Tower max level is 30
    expect(getCraftingModeMaxLevel("Hook Tower", 17)).toBe(30);
    // At TH 1, should be 0
    expect(getCraftingModeMaxLevel("Hook Tower", 1)).toBe(0);
  });

  test("getCraftingModeCount returns correct count", () => {
    // At TH 17, Hook Tower count is 1
    expect(getCraftingModeCount("Hook Tower", 17)).toBe(1);
    // At TH 1, should be 0
    expect(getCraftingModeCount("Hook Tower", 1)).toBe(0);
  });

  test("getEntityNames returns all entity names", () => {
    const names = getEntityNames();
    expect(names).toContain("Cannon");
    expect(names).toContain("Townhall");
  });

  test("getType and getUses work for all entities", () => {
    const names = getEntityNames();
    for (const name of names) {
      expect(typeof getType(name) === "string" || getType(name) === null).toBe(
        true,
      );
      expect(typeof getUses(name) === "string" || getUses(name) === null).toBe(
        true,
      );
    }
  });

  test("getCount and getMaxLevel work for all entities and TH 1", () => {
    const names = getEntityNames();
    for (const name of names) {
      expect(
        typeof getCount(name, 1) === "number" || getCount(name, 1) === null,
      ).toBe(true);
      expect(
        typeof getMaxLevel(name, 1) === "number" ||
          getMaxLevel(name, 1) === null,
      ).toBe(true);
    }
  });
});

describe("Gear Up Functions", () => {
  test("getGearUpData returns correct data for buildings that can gear up", () => {
    const cannonGearUp = getGearUpData("Cannon");
    expect(cannonGearUp).not.toBeNull();
    expect(cannonGearUp).toHaveProperty("cost");
    expect(cannonGearUp).toHaveProperty("time");
    expect(cannonGearUp).toHaveProperty("count");
    expect(cannonGearUp).toHaveProperty("requiredLevel");
  });

  test("getGearUpData returns null for buildings that cannot gear up", () => {
    const wizardTowerGearUp = getGearUpData("Wizard Tower");
    expect(wizardTowerGearUp).toBeNull();
  });

  test("getGearUpData returns null for non-buildings", () => {
    const barbarianGearUp = getGearUpData("Barbarian");
    expect(barbarianGearUp).toBeNull();
  });

  test("getGearUpCost returns correct cost", () => {
    const cannonCost = getGearUpCost("Cannon");
    expect(cannonCost).toBeGreaterThan(0);
    expect(typeof cannonCost).toBe("number");
  });

  test("getGearUpCost returns null for non-gear-up buildings", () => {
    const wizardTowerCost = getGearUpCost("Wizard Tower");
    expect(wizardTowerCost).toBeNull();
  });

  test("getGearUpTime returns correct time", () => {
    const cannonTime = getGearUpTime("Cannon");
    expect(cannonTime).toBeGreaterThan(0);
    expect(typeof cannonTime).toBe("number");
  });

  test("getGearUpTime returns null for non-gear-up buildings", () => {
    const wizardTowerTime = getGearUpTime("Wizard Tower");
    expect(wizardTowerTime).toBeNull();
  });

  test("getGearUpCount returns correct count", () => {
    const cannonCount = getGearUpCount("Cannon");
    expect(cannonCount).toBeGreaterThan(0);
    expect(typeof cannonCount).toBe("number");
  });

  test("getGearUpCount returns null for non-gear-up buildings", () => {
    const wizardTowerCount = getGearUpCount("Wizard Tower");
    expect(wizardTowerCount).toBeNull();
  });

  test("getGearUpRequiredLevel returns correct level", () => {
    const cannonRequiredLevel = getGearUpRequiredLevel("Cannon");
    expect(cannonRequiredLevel).toBeGreaterThan(0);
    expect(typeof cannonRequiredLevel).toBe("number");
  });

  test("getGearUpRequiredLevel returns null for non-gear-up buildings", () => {
    const wizardTowerRequiredLevel = getGearUpRequiredLevel("Wizard Tower");
    expect(wizardTowerRequiredLevel).toBeNull();
  });

  test("canGearUpAtLevel returns true when level is sufficient", () => {
    const requiredLevel = getGearUpRequiredLevel("Cannon");
    if (requiredLevel !== null) {
      expect(canGearUpAtLevel("Cannon", requiredLevel)).toBe(true);
      expect(canGearUpAtLevel("Cannon", requiredLevel + 1)).toBe(true);
    }
  });

  test("canGearUpAtLevel returns false when level is insufficient", () => {
    const requiredLevel = getGearUpRequiredLevel("Cannon");
    if (requiredLevel !== null) {
      expect(canGearUpAtLevel("Cannon", requiredLevel - 1)).toBe(false);
    }
  });

  test("canGearUpAtLevel returns false for non-gear-up buildings", () => {
    expect(canGearUpAtLevel("Wizard Tower", 10)).toBe(false);
    expect(canGearUpAtLevel("Barbarian", 10)).toBe(false);
  });

  test("gear up data is consistent across all functions", () => {
    const gearUpData = getGearUpData("Cannon");
    if (gearUpData) {
      expect(getGearUpCost("Cannon")).toBe(gearUpData.cost);
      expect(getGearUpTime("Cannon")).toBe(gearUpData.time);
      expect(getGearUpCount("Cannon")).toBe(gearUpData.count);
      expect(getGearUpRequiredLevel("Cannon")).toBe(gearUpData.requiredLevel);
    }
  });

  test("all gear up functions work for all entities", () => {
    const names = getEntityNames();
    for (const name of names) {
      // These should not throw errors
      getGearUpData(name);
      getGearUpCost(name);
      getGearUpTime(name);
      getGearUpCount(name);
      getGearUpRequiredLevel(name);
      canGearUpAtLevel(name, 10);
    }
  });
});
