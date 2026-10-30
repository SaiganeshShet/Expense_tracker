import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("Expense tracker", () => {
  it("adds a valid expense and updates the total and count", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Expense title"), "Lunch");
    await user.type(screen.getByLabelText("Amount"), "250");
    await user.selectOptions(screen.getByLabelText("Category"), "Food");
    await user.click(screen.getByRole("button", { name: /add expense/i }));

    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.getByTestId("total")).toHaveTextContent("$250.00");
    expect(screen.getByText("1", { selector: '[data-cy="count"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Expense title")).toHaveValue("");
  });

  it("rejects an empty title without adding an expense", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Amount"), "25");
    await user.click(screen.getByRole("button", { name: /add expense/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter an expense title.");
    expect(screen.queryByTestId("expense-item")).not.toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it.each(["abc", "0", "-5", "100000.01"])(
    "rejects an invalid amount of %s",
    async (amount) => {
      const user = userEvent.setup();
      render(<App />);

      await user.type(screen.getByLabelText("Expense title"), "Invalid");
      await user.type(screen.getByLabelText("Amount"), amount);
      await user.click(screen.getByRole("button", { name: /add expense/i }));

      expect(screen.getByLabelText("Amount")).toHaveAttribute("aria-invalid", "true");
      expect(screen.queryByTestId("expense-item")).not.toBeInTheDocument();
    },
  );

  it("filters expenses by category and updates the displayed total", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addExpense(user, "Lunch", "250", "Food");
    await addExpense(user, "Cab", "400", "Travel");

    await user.selectOptions(screen.getByLabelText("Show"), "Food");

    expect(screen.getAllByTestId("expense-item")).toHaveLength(1);
    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.queryByText("Cab")).not.toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("total")).toHaveTextContent("$250.00");
  });

  it("deletes an expense and recalculates the total and count", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addExpense(user, "Lunch", "250", "Food");

    await user.click(screen.getByRole("button", { name: "Delete Lunch" }));

    expect(screen.queryByText("Lunch")).not.toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("total")).toHaveTextContent("$0.00");
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("adds expenses under the selected category", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Expense title"), "Electricity");
    await user.type(screen.getByLabelText("Amount"), "82");
    await user.selectOptions(screen.getByLabelText("Category"), "Bills");
    await user.click(screen.getByRole("button", { name: /add expense/i }));

    const item = screen.getByTestId("expense-item");
    expect(within(item).getByText("Bills")).toBeInTheDocument();
  });
});

async function addExpense(user, title, amount, category) {
  await user.type(screen.getByLabelText("Expense title"), title);
  await user.type(screen.getByLabelText("Amount"), amount);
  await user.selectOptions(screen.getByLabelText("Category"), category);
  await user.click(screen.getByRole("button", { name: /add expense/i }));
}
