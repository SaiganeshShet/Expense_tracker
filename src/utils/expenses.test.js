import {
  calculateTotal,
  formatCurrency,
  MAX_EXPENSE_AMOUNT,
  validateExpense,
} from "./expenses.js";

describe("validateExpense", () => {
  it("accepts a trimmed title and positive numeric amount", () => {
    expect(validateExpense(" Lunch ", "12.5")).toEqual({});
  });

  it("rejects an empty or whitespace-only title", () => {
    expect(validateExpense("  ", "10")).toHaveProperty("title");
  });

  it.each(["", "abc", "Infinity"])("rejects non-numeric amount %s", (amount) => {
    expect(validateExpense("Lunch", amount)).toHaveProperty("amount");
  });

  it.each(["0", "-1"])("rejects zero or negative amount %s", (amount) => {
    expect(validateExpense("Lunch", amount)).toHaveProperty("amount");
  });

  it("accepts the maximum allowed amount", () => {
    expect(validateExpense("Rent", String(MAX_EXPENSE_AMOUNT))).toEqual({});
  });

  it("rejects amounts over 100,000", () => {
    expect(validateExpense("Rent", "100000.01")).toHaveProperty("amount");
  });
});

describe("expense calculations", () => {
  it("calculates a total for the provided expenses", () => {
    expect(
      calculateTotal([
        { amount: 10.25 },
        { amount: 5.5 },
        { amount: 4.25 },
      ]),
    ).toBe(20);
  });

  it("returns zero when there are no expenses", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("formats totals with two decimal places", () => {
    expect(formatCurrency(250)).toBe("$250.00");
  });
});
