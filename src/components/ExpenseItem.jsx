import { formatCurrency } from "../utils/expenses.js";

// Props provide the expense and delete callback; the component has no local state.
export default function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <div className="expense-icon" aria-hidden="true">
        {expense.category === "Food"
          ? "🍴"
          : expense.category === "Travel"
            ? "🚌"
            : expense.category === "Bills"
              ? "↗"
              : "✦"}
      </div>
      <div className="expense-description">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
      </div>
      <strong className="expense-amount">{formatCurrency(expense.amount)}</strong>
      <button
        className="icon-button delete-button"
        type="button"
        data-cy="delete-expense"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDelete(expense.id)}
      >
        ×
      </button>
    </li>
  );
}
