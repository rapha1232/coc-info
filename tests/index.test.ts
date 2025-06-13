import { getMaxLevel } from "../src";

describe("getMaxLevel", () => {
  describe("TH-dependent entities", () => {
    test("returns correct max level for buildings", () => {
      expect(getMaxLevel("Cannon", 13)).toBe(19);
      expect(getMaxLevel("Wizard Tower", 12)).toBe(11);
      expect(getMaxLevel("Inferno Tower", 10)).toBe(3);
      expect(getMaxLevel("townHallWeapon", 16)).toBe(1);
      expect(getMaxLevel("Spell Tower", 17)).toBe(3);
      expect(getMaxLevel("Firespitter", 15)).toBe(0);
    });

    test("returns correct max level for heroes", () => {
      expect(getMaxLevel("Barbarian King", 13)).toBe(75);
      expect(getMaxLevel("Archer Queen", 10)).toBe(40);
      expect(getMaxLevel("Minion Prince", 14)).toBe(60);
      expect(getMaxLevel("Grand Warden", 17)).toBe(75);
      expect(getMaxLevel("Royal Champion", 9)).toBe(0);
    });

    test("returns correct max level for labs", () => {
      expect(getMaxLevel("Barbarian", 10)).toBe(7);
      expect(getMaxLevel("Dragon", 14)).toBe(9);
      expect(getMaxLevel("Minion", 12)).toBe(8);
      expect(getMaxLevel("Rage Spell", 8)).toBe(5);
      expect(getMaxLevel("Log Launcher", 17)).toBe(5);
    });

    test("returns correct max level for pets", () => {
      expect(getMaxLevel("L.A.S.S.I", 14)).toBe(10);
      expect(getMaxLevel("Unicorn", 15)).toBe(10);
      expect(getMaxLevel("Phoenix", 16)).toBe(10);
      expect(getMaxLevel("Sneezy", 17)).toBe(10);
    });
  });
});
