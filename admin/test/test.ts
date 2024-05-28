import {todaysDate} from './../pages/api/today';
import {describe, expect, it} from '@jest/globals';

describe('todaysDate', () => {
  it('should return today\'s date in YYYY-MM-DD format', () => {
    const currentDate = new Date().toISOString().substring(0, 10);
    const result = todaysDate();
    expect(result).toBe(currentDate);
  });
});