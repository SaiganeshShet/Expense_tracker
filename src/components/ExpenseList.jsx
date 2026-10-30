import ExpenseItem from "./ExpenseItem.jsx";

// Props provide the visible expenses and delete callback; the component has no local state.
export default function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state" data-cy="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ◌
        </span>
        <p>No expenses to show</p>
        <span>Try adding one or choosing a different category.</span>
      </div>
    );
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDeleteExpense}
        />
      ))}
    </ul>
  );
}
