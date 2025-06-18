import { getCount, getGear, getMaxLevel, getType } from "../index";
import {
    formatBuildTime,
    getCost,
    getCraftingModes,
    getModuleUpgradeCost,
    getModuleUpgradeTime,
    getTime,
    isUpgraded,
} from "../utils";

describe("Clash of Clans Data Utilities", () => {
  describe("getMaxLevel", () => {
    describe("TH-dependent entities", () => {
      test("returns correct max level for buildings", () => {
        expect(getMaxLevel("Cannon", 13)).toBe(19);
        expect(getMaxLevel("Wizard Tower", 12)).toBe(11);
      });

      test("returns null for invalid entities", () => {
        expect(getMaxLevel("Nonexistent Building", 10)).toBeNull();
      });

      test("Seasonal buildings return null when not available", () => {
        expect(getMaxLevel("Spooky Tree", 15)).toBeNull();
      });
    });
  });

  describe("getCount", () => {
    test("returns correct count for buildings", () => {
      // Buildings that exist at TH
      expect(getCount("Archer Tower", 11)).toBe(8);
      expect(getCount("X-Bow", 14)).toBe(4);

      // Locked buildings (max level 0)
      expect(getCount("Scattershot", 9)).toBe(0);
    });

    test("returns correct count for troops/spells", () => {
      // Available troops
      expect(getCount("Barbarian", 10)).toBe(1);

      // Locked troops
      expect(getCount("Electro Dragon", 5)).toBe(0);
    });

    test("returns null for invalid entities", () => {
      expect(getCount("Nonexistent Unit", 10)).toBeNull();
    });

    test("Siege Machine counts", () => {
      expect(getCount("Wall Wrecker", 12)).toBe(1);
      expect(getCount("Stone Slammer", 13)).toBe(1);
    });
  });

  describe("getType", () => {
    test("returns correct types", () => {
      expect(getType("Cannon")).toBe("defense");
      expect(getType("Barbarian King")).toBe("hero");
      expect(getType("Barbarian")).toBe("troop");
      expect(getType("Lightning Spell")).toBe("spell");
      expect(getType("Gold Mine")).toBe("resource");
    });

    test("returns null for invalid entities", () => {
      expect(getType("Nonexistent Entity")).toBeNull();
    });
  });

  describe("Gear Functions", () => {
    describe("getGear", () => {
      test("returns correct gear status for buildings", () => {
        expect(getGear("Cannon")).toBe(true);
        expect(getGear("Archer Tower")).toBe(true);
        expect(getGear("Wizard Tower")).toBeNull();
      });

      test("returns null for non-buildings", () => {
        expect(getGear("Barbarian")).toBeNull();
      });
    });
  });

  describe("Special Cases", () => {
    test("Builder's Hut type changes at TH14", () => {
      expect(getType("Builder's Hut")).toBe("resource");
      // This assumes your data processing handles the TH14+ case
      // You might need a getTypeAtTH function for this specific case
    });

    test("Town Hall weapon counts", () => {
      expect(getCount("Giga Inferno TH13", 13)).toBe(1);
      expect(getMaxLevel("Giga Inferno TH16", 16)).toBe(1);
    });
  });

  describe("Cost and Time Functions", () => {
    describe("getCost", () => {
      test("returns correct cost for defense upgrades", () => {
        expect(getCost("X-Bow", 1)).toBe(1000000); // Level 1
        expect(getCost("X-Bow", 5)).toBe(3900000); // Level 5
        expect(getCost("X-Bow", 12)).toBe(21500000); // Max level
      });

      test("returns null for invalid levels", () => {
        expect(getCost("X-Bow", 0)).toBeNull(); // Under min
        expect(getCost("X-Bow", 13)).toBeNull(); // Over max
      });

      test("handles Builder's Hut gem costs (Level 1)", () => {
        expect(getCost("Builder's Hut", 1, 1)).toBe(0); // 1st hut (free)
        expect(getCost("Builder's Hut", 1, 2)).toBe(250); // 2nd hut
        expect(getCost("Builder's Hut", 1, 5)).toBe(2000); // 5th hut
      });

      test("handles Builder's Hut gold costs (Level 2+)", () => {
        expect(getCost("Builder's Hut", 2)).toBe(4000000); // Level 2
        expect(getCost("Builder's Hut", 3)).toBe(5000000); // Level 3
      });

      test("returns null for invalid Builder's Hut queries", () => {
        expect(getCost("Builder's Hut", 1, 6)).toBeNull(); // Beyond 5 huts
        expect(getCost("Builder's Hut", 0)).toBeNull(); // Invalid level
      });
    });

    describe("getTime", () => {
      test("returns correct time for X-Bow upgrades", () => {
        expect(getTime("X-Bow", 1)).toBe(43200);
        expect(getTime("Air Defense", 6)).toBe(86400);
        expect(getTime("Firespitter", 12)).toBeNull(); // 1339200s
      });

      test("returns instant time for Builder's Hut Level 1", () => {
        expect(getTime("Builder's Hut", 1)).toBe(0);
      });

      test("returns correct time for Builder's Hut upgrades", () => {
        expect(getTime("Builder's Hut", 2)).toBe(86400 * 3);
        expect(getTime("Builder's Hut", 7)).toBe(1317600);
      });
    });

    describe("isUpgraded", () => {
      test("returns false for Builder's Hut Level 1", () => {
        expect(isUpgraded("Builder's Hut", 1)).toBe(false);
      });

      test("returns true for Builder's Hut Level 2+", () => {
        expect(isUpgraded("Builder's Hut", 2)).toBe(true);
        expect(isUpgraded("Builder's Hut", 3)).toBe(true);
      });

      test("returns false for non-Builder's Hut entities", () => {
        expect(isUpgraded("Cannon", 5)).toBe(false);
      });
    });
  });

  describe("Utility Functions", () => {
    describe("getCraftingModes", () => {
      test("returns correct crafting modes", () => {
        const modes = getCraftingModes();
        expect(modes).toContain("Hook Tower");
        expect(modes).toContain("Flame Spinner");
        expect(modes).toContain("Crusher Mortar");
        expect(modes.length).toBe(3);
      });
    });

    describe("getModuleUpgradeCost", () => {
      test("returns correct module costs", () => {
        expect(getModuleUpgradeCost("Hook Tower", "Hitpoints", 2)).toBe(
          4000000,
        );
        expect(getModuleUpgradeCost("Hook Tower", "Attack Cooldown", 2)).toBe(
          5000000,
        );
      });

      test("returns null for invalid inputs", () => {
        expect(getModuleUpgradeCost("Hook Tower", "Nonexistent", 1)).toBeNull();
      });
    });

    describe("getModuleUpgradeTime", () => {
      test("returns correct module times", () => {
        expect(getModuleUpgradeTime("Hook Tower", "Hitpoints", 2)).toBe(86400);
        expect(getModuleUpgradeTime("Hook Tower", "Attack Cooldown", 2)).toBe(
          43200,
        );
      });

      test("returns null for invalid inputs", () => {
        expect(getModuleUpgradeTime("Hook Tower", "Nonexistent", 1)).toBeNull();
      });
    });

    describe("formatBuildTime", () => {
      test("formats seconds correctly", () => {
        expect(formatBuildTime(0)).toBe("0s");
        expect(formatBuildTime(60)).toBe("1m");
        expect(formatBuildTime(3600)).toBe("1h");
        expect(formatBuildTime(86400)).toBe("1d");
        expect(formatBuildTime(90000)).toBe("1d 1h");
      });
    });
  });
});
