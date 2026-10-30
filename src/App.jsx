import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import {
  calculateTotal,
  formatCurrency,
} from "./utils/expenses.js";
import "./App.css";

// App owns the expense and filter state, then passes data and callbacks to each component.
export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const visibleExpenses =
    categoryFilter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === categoryFilter);

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...currentExpenses,
    ]);
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pennywise home">
          <span className="brand-mark" aria-hidden="true">
            p
          </span>
          <span>Pennywise</span>
        </a>
        <span className="topbar-note">Your money, in focus.</span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>
          <h1>Expense tracker</h1>
          <p className="welcome-copy">
            Keep the little things in check, and the big picture in view.
          </p>
        </div>
        <div className="welcome-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="summary-card" aria-label="Expense summary">
        <div className="summary-icon" aria-hidden="true">
          $
        </div>
        <div>
          <p className="summary-label">TOTAL SPENDING</p>
          <p className="summary-total" data-cy="total">
            {formatCurrency(calculateTotal(visibleExpenses))}
          </p>
        </div>
        <span className="summary-period">
          {categoryFilter === "All" ? "All categories" : `${categoryFilter} only`}
        </span>
      </section>

      <section className="content-grid">
        <section className="panel add-panel" aria-labelledby="add-heading">
          <div className="panel-heading">
            <div className="heading-icon add-heading-icon" aria-hidden="true">
              +
            </div>
            <div>
              <h2 id="add-heading">Add an expense</h2>
              <p>Every detail helps you stay on track.</p>
            </div>
          </div>
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        <section className="panel expenses-panel" aria-labelledby="expenses-heading">
          <div className="expenses-heading">
            <div className="panel-heading">
              <div className="heading-icon list-heading-icon" aria-hidden="true">
                ☷
              </div>
              <div>
                <h2 id="expenses-heading">Your expenses</h2>
                <p>
                  <span data-cy="count">{visibleExpenses.length}</span>{" "}
                  {visibleExpenses.length === 1 ? "expense" : "expenses"} shown
                </p>
              </div>
            </div>
            <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
          </div>
          <ExpenseList
            expenses={visibleExpenses}
            onDeleteExpense={deleteExpense}
          />
        </section>
      </section>
      <footer className="footer">A clearer view of where it all goes.</footer>
    </main>
  );
}
