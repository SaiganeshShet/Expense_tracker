# Coding agent prompt library

## New feature

**Context:** [Describe the app, relevant files, and existing behavior.]

**Goal:** [Describe the feature to implement.]

**Constraints:** [List stack, design, compatibility, and scope boundaries. Do not add dependencies without approval.]

**Acceptance criteria:** [List observable outcomes, each independently verifiable by a test.]

**Examples:** [Give representative inputs and expected outputs.]

Ask for an implementation plan first. Wait for approval before editing. After implementation, summarize changed files, tests run, and any limitations.

## Bug fix

**Context:** [Relevant code and environment.]

**Goal:** Reproduce and fix [specific incorrect behavior].

**Constraints:** Preserve unrelated behavior and avoid unrelated refactors.

**Acceptance criteria:** [State a failing regression test and any behavior that must remain unchanged.]

**Examples:** [Steps to reproduce and expected behavior.]

First explain the likely cause and a minimal plan. Wait for approval, add a regression test, fix the root cause, and report verification.

## Refactor

**Context:** [Relevant files and current behavior.]

**Goal:** Improve [specific structure or maintainability concern] without changing behavior.

**Constraints:** Keep public interfaces and user-visible output unchanged; do not add dependencies.

**Acceptance criteria:** [List tests and checks that prove behavior is preserved.]

**Examples:** [Show the intended structure or before/after shape.]

Propose a plan and wait for approval before editing.

## Generate tests

**Context:** [Source files, test framework, and existing tests.]

**Goal:** Add tests for [specific uncovered behavior].

**Constraints:** Do not change production code or existing tests unless explicitly approved. Tests must assert meaningful outcomes and must fail if the behavior is broken.

**Acceptance criteria:** [Name the required cases and observable assertions.]

**Examples:** [Inputs and expected results, including edge cases.]

Explain the test plan first, wait for approval, then run the targeted tests.

## Review diff

**Context:** [Feature request and affected files.]

**Goal:** Review the proposed diff for correctness, regressions, test gaps, accessibility, and scope.

**Constraints:** Do not edit files. Report only actionable findings, ordered by severity, with file and line references.

**Acceptance criteria:** [Confirm whether the requested behavior is complete and whether relevant tests pass.]

**Examples:** [Point out a representative failure mode if useful.]

Inspect the full diff and relevant surrounding code before reporting.

## Commit message

**Context:** [Branch purpose and user request.]

**Goal:** Write a concise commit subject and, if useful, a short body describing the change.

**Constraints:** Do not commit or change files. Use the repository's commit conventions.

**Acceptance criteria:** The subject describes the change, uses imperative phrasing, and stays concise.

**Examples:** [Provide a recent message or preferred format.]

Inspect the diff and return only the proposed commit message.

## Feature prompt: add expense

**Context:** This is a React expense tracker built with Vite. Application state belongs in `src/App.jsx`; reusable UI is in `src/components/`; pure helpers are in `src/utils/expenses.js`. Vitest, React Testing Library, and Cypress are used for tests.

**Goal:** Let a user add an expense with a title, amount, and category.

**Constraints:** Use the existing component and state conventions. Categories are Food, Travel, Bills, and Other. Reject blank titles, non-numeric amounts, amounts at or below zero, and amounts above 100,000. Do not add dependencies. Add stable `data-cy` selectors to controls used by Cypress.

**Acceptance criteria:**

1. Submitting a nonblank title, a finite amount greater than zero and at most 100,000, and a valid category adds exactly one expense row with those values.
2. Adding a valid expense updates the displayed expense count by exactly one and updates the displayed total to two decimal places.
3. Submitting a blank or whitespace-only title displays a title validation error and does not add a row.
4. Submitting a non-numeric, zero, negative, or greater-than-100,000 amount displays an amount validation error and does not add a row.
5. After a successful submission, the title and amount fields are empty and the category returns to Food.
6. Each category control offers exactly Food, Travel, Bills, and Other as selectable expense categories.

**Examples:** Submitting `Lunch`, `250`, `Food` adds one Food row displaying `$250.00`. Submitting a blank title with amount `20`, or title `Rent` with amount `0`, leaves the row count unchanged and displays the relevant validation error.

Ask for an implementation plan and wait for approval before changing code. After approval, implement the smallest complete change, add or update tests, run the focused tests and lint, and summarize the diff and verification.
