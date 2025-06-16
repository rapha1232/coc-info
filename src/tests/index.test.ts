import { getCount, getGear, getMaxLevel, getType } from "../index";

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
        expect(getGear("Wizard Tower")).toBe(false);
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
});
