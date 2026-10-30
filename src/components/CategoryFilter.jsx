import { CATEGORIES } from "../utils/expenses.js";

// Props expose the selected category and its change callback; the component has no local state.
export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="filter-field">
      <label htmlFor="category-filter">Show</label>
      <select
        id="category-filter"
        data-cy="filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
