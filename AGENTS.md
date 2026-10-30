# Project guide

## Stack and layout

- React 18 with Vite; JavaScript and JSX.
- `src/App.jsx` owns application state.
- `src/components/` has one component per file: `ExpenseForm`, `ExpenseList`, `ExpenseItem`, and `CategoryFilter`.
- `src/utils/expenses.js` contains pure validation, formatting, and calculation helpers.
- `src/*.test.jsx` and `src/utils/*.test.js` contain Vitest and React Testing Library tests.
- `cypress/e2e/` contains browser-level tests.

## Commands

- Install: `npm install`
- Start the app: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Unit/component tests: `npm run test:run`
- Coverage: `npm run test:coverage`
- Cypress interactive: start `npm run dev`, then `npm run cy:open`
- Cypress headless: start `npm run dev`, then `npm run cy:run`

## Conventions and workflow

- Keep application state in `App`; pass values and callbacks to components through props.
- Keep each component in its own file and place reusable pure logic in `src/utils/`.
- Use stable `data-cy` selectors for end-to-end tests.
- Do not add dependencies without asking first.
- Work on a feature branch, review the complete diff, and summarize the changes and test results for the pull request.
- Ask for a plan and approval before making code changes for a new task.
- Keep changes scoped, add meaningful tests, and verify invalid inputs and edge cases.
