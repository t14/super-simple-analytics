const importData = require("../scripts/importData");

describe("getLast7Days", () => {
  test("returns an array of the last 7 days starting from the current date", () => {
    const expectedDates = [
      // Calculate expected dates based on current date
      new Date().toISOString().slice(0, 10), // Today's date
      // Date for 1 day ago
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
      // Date for 2 days ago
      new Date(new Date().setDate(new Date().getDate() - 2))
        .toISOString()
        .slice(0, 10),
      // Date for 3 days ago
      new Date(new Date().setDate(new Date().getDate() - 3))
        .toISOString()
        .slice(0, 10),
      // Date for 4 days ago
      new Date(new Date().setDate(new Date().getDate() - 4))
        .toISOString()
        .slice(0, 10),
      // Date for 5 days ago
      new Date(new Date().setDate(new Date().getDate() - 5))
        .toISOString()
        .slice(0, 10),
      // Date for 6 days ago
      new Date(new Date().setDate(new Date().getDate() - 6))
        .toISOString()
        .slice(0, 10),
    ];

    expect(importData.getLast7Days()).toEqual(expectedDates);
  });
});
