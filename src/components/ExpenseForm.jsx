import { useState } from "react";
import { CATEGORIES, validateExpense } from "../utils/expenses.js";

// Props provide the add callback; local state holds the form fields and validation errors.
export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateExpense(title, amount);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onAddExpense({ title: title.trim(), amount: Number(amount), category });
    setTitle("");
    setAmount("");
    setCategory(CATEGORIES[0]);
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="expense-title">Expense title</label>
        <input
          id="expense-title"
          data-cy="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
          placeholder="e.g. Weekly groceries"
        />
        {errors.title && (
          <p className="field-error" id="title-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="expense-amount">Amount</label>
        <div className="amount-input">
          <span aria-hidden="true">$</span>
          <input
            id="expense-amount"
            data-cy="amount"
            type="number"
            min="0.01"
            max="100000"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            placeholder="0.00"
          />
        </div>
        {errors.amount && (
          <p className="field-error" id="amount-error" role="alert">
            {errors.amount}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="expense-category">Category</label>
        <select
          id="expense-category"
          data-cy="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button className="button button-primary add-button" data-cy="add-expense">
        <span aria-hidden="true">+</span> Add expense
      </button>
    </form>
  );
}
