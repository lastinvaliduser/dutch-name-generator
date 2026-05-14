import { describe, it, expect } from 'vitest';
import { generateDutchName, nameDictionary, nationalities } from '../utils/nameMapper';

describe('generateDutchName', () => {
  it('returns 3 name options', () => {
    const results = generateDutchName('John', 'Smith', 'english', 'any');
    expect(results).toHaveLength(3);
  });

  it('returns null for empty input', () => {
    expect(generateDutchName('', 'Smith', 'english', 'any')).toBeNull();
    expect(generateDutchName('John', '', 'english', 'any')).toBeNull();
    expect(generateDutchName('  ', '  ', 'english', 'any')).toBeNull();
  });

  it('uses direct translation when a known name is given', () => {
    const results = generateDutchName('John', 'Smith', 'english', 'any');
    const directOption = results!.find(r => r.type === 'Direct Translation');
    expect(directOption).toBeDefined();
    expect(directOption!.isMapped).toBe(true);
    expect(directOption!.fullName).toContain('Jan');
  });

  it('uses "Closest Match" when no translation exists', () => {
    const results = generateDutchName('Zxywq', 'Unknown', 'english', 'any');
    const closest = results!.find(r => r.type === 'Closest Match');
    expect(closest).toBeDefined();
    expect(closest!.isMapped).toBe(false);
  });

  it('always includes a "Classic Pick" and a "Modern Choice"', () => {
    const results = generateDutchName('John', 'Smith', 'english', 'any');
    expect(results!.find(r => r.type === 'Classic Pick')).toBeDefined();
    expect(results!.find(r => r.type === 'Modern Choice')).toBeDefined();
  });

  it('every result has fullName and meaning', () => {
    const results = generateDutchName('Emily', 'Brown', 'english', 'female');
    results!.forEach(r => {
      expect(r.fullName).toBeTruthy();
      expect(r.meaning).toBeTruthy();
    });
  });

  it('is deterministic — same input always gives same output', () => {
    const a = generateDutchName('Peter', 'Jones', 'english', 'male');
    const b = generateDutchName('Peter', 'Jones', 'english', 'male');
    expect(a).toEqual(b);
  });

  it('produces different results for different names', () => {
    const a = generateDutchName('John', 'Smith', 'english', 'male');
    const b = generateDutchName('Emily', 'Brown', 'english', 'female');
    expect(a![0].fullName).not.toEqual(b![0].fullName);
  });

  it('respects gender=female — uses female name pool', () => {
    const results = generateDutchName('Zxywq', 'Test', 'english', 'female');
    // The closest match should come from the female names pool
    const femaleNames = ['Emma', 'Julia', 'Mila', 'Tess', 'Sophie', 'Zoe', 'Sara', 'Nora', 'Yara', 'Lotte', 'Sanne', 'Lieke', 'Roos', 'Maud', 'Fleur'];
    const closestFirstName = results![0].fullName.split(' ')[0];
    expect(femaleNames).toContain(closestFirstName);
  });

  it('respects gender=male — uses male name pool', () => {
    const results = generateDutchName('Zxywq', 'Test', 'english', 'male');
    const maleNames = ['Daan', 'Sem', 'Lucas', 'Milan', 'Levi', 'Luuk', 'Bram', 'Finn', 'Jesse', 'Max', 'Lars', 'Thijs', 'Niels', 'Koen', 'Bas'];
    const closestFirstName = results![0].fullName.split(' ')[0];
    expect(maleNames).toContain(closestFirstName);
  });

  it('handles Spanish names with direct translations', () => {
    const results = generateDutchName('Juan', 'Garcia', 'spanish', 'male');
    const direct = results!.find(r => r.type === 'Direct Translation');
    expect(direct).toBeDefined();
    expect(direct!.fullName).toContain('Jan');
  });

  it('handles French names with direct translations', () => {
    const results = generateDutchName('Pierre', 'Dupont', 'french', 'male');
    const direct = results!.find(r => r.type === 'Direct Translation');
    expect(direct).toBeDefined();
    expect(direct!.fullName).toContain('Pieter');
  });

  it('is case-insensitive for first name lookup', () => {
    const lower = generateDutchName('john', 'smith', 'english', 'any');
    const upper = generateDutchName('JOHN', 'smith', 'english', 'any');
    const mixed = generateDutchName('JoHn', 'smith', 'english', 'any');
    expect(lower).toEqual(upper);
    expect(lower).toEqual(mixed);
  });

  it('trims whitespace from names', () => {
    const clean = generateDutchName('John', 'Smith', 'english', 'any');
    const padded = generateDutchName('  John  ', '  Smith  ', 'english', 'any');
    expect(clean).toEqual(padded);
  });
});

describe('nationalities', () => {
  it('contains at least the core nationalities', () => {
    const ids = nationalities.map(n => n.id);
    expect(ids).toContain('english');
    expect(ids).toContain('spanish');
    expect(ids).toContain('french');
    expect(ids).toContain('german');
    expect(ids).toContain('other');
  });

  it('each nationality has id, label, and flag', () => {
    nationalities.forEach(n => {
      expect(n.id).toBeTruthy();
      expect(n.label).toBeTruthy();
      expect(n.flag).toBeTruthy();
    });
  });
});

describe('nameDictionary', () => {
  it('maps known English names to Dutch equivalents', () => {
    expect(nameDictionary.john).toBe('Jan');
    expect(nameDictionary.william).toBe('Willem');
    expect(nameDictionary.peter).toBe('Pieter');
    expect(nameDictionary.mary).toBe('Maria');
  });

  it('maps known Spanish names to Dutch equivalents', () => {
    expect(nameDictionary.juan).toBe('Jan');
    expect(nameDictionary.pedro).toBe('Pieter');
  });

  it('maps known French names to Dutch equivalents', () => {
    expect(nameDictionary.jean).toBe('Jan');
    expect(nameDictionary.pierre).toBe('Pieter');
  });
});
