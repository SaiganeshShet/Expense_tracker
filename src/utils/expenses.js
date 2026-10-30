export const CATEGORIES = ["Food", "Travel", "Bills", "Other"];
export const MAX_EXPENSE_AMOUNT = 100000;

export function validateExpense(title, amount) {
  const errors = {};
  const numericAmount = Number(amount);

  if (!title.trim()) {
    errors.title = "Enter an expense title.";
  }

  if (amount.trim() === "" || !Number.isFinite(numericAmount)) {
    errors.amount = "Enter a valid amount.";
  } else if (numericAmount <= 0) {
    errors.amount = "Amount must be greater than zero.";
  } else if (numericAmount > MAX_EXPENSE_AMOUNT) {
    errors.amount = `Amount must be no more than ${MAX_EXPENSE_AMOUNT.toLocaleString("en-US")}.`;
  }

  return errors;
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
