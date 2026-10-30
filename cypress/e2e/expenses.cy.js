describe("Expense tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds expenses and filters by category", () => {
    addExpense("Lunch", "250", "Food");
    addExpense("Cab", "400", "Travel");

    cy.get('[data-cy="total"]').should("contain", "650.00");
    cy.get('[data-cy="filter"]').select("Food");
    cy.get('[data-cy="expense-item"]').should("have.length", 1);
    cy.get('[data-cy="expense-item"]').should("contain", "Lunch");
    cy.get('[data-cy="count"]').should("contain", "1");
    cy.get('[data-cy="total"]').should("contain", "250.00");
  });

  it("does not add an expense with an empty title or negative amount", () => {
    cy.get('[data-cy="amount"]').type("20");
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[role="alert"]').should("contain", "Enter an expense title.");
    cy.get('[data-cy="expense-item"]').should("not.exist");

    cy.get('[data-cy="title"]').type("Invalid expense");
    cy.get('[data-cy="amount"]').clear().type("-5");
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[data-cy="amount"]').should("have.attr", "aria-invalid", "true");
    cy.get('[data-cy="expense-item"]').should("not.exist");
  });

  it("deletes an expense and updates the total and count", () => {
    addExpense("Coffee", "5", "Food");
    cy.get('[data-cy="delete-expense"]').click();
    cy.get('[data-cy="expense-item"]').should("not.exist");
    cy.get('[data-cy="count"]').should("contain", "0");
    cy.get('[data-cy="total"]').should("contain", "0.00");
  });
});

function addExpense(title, amount, category) {
  cy.get('[data-cy="title"]').type(title);
  cy.get('[data-cy="amount"]').type(amount);
  cy.get('[data-cy="category"]').select(category);
  cy.get('[data-cy="add-expense"]').click();
}
