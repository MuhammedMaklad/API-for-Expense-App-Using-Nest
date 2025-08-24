# Expense App

This is a simple expense tracking application built with NestJS. It allows users to manage their income and expenses.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-app.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the app

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:watch

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

The available API endpoints are listed in the `routes.md` file.

### Expense App routes

| Method | Path                | Action |
| ------ | ------------------- | ------ |
| GET    | /report/income      | Get All|
| GET    | /report/income/:id  | GET One|
| POST   | /report/income      | Create |
| PUT    | /report/income/:id  | Update |
| DELETE | /report/income/:id  | Delete |

| Method | Path                | Action |
| ------ | ------------------- | ------ |
| GET    | /report/expense     | Get All|
| GET    | /report/expense/:id | GET One|
| POST   | /report/expense     | Create |
| PUT    | /report/expense/:id | Update |
| DELETE | /report/expense/:id | Delete |

### Auth routes

Please refer to `src/auth/auth.controller.ts` for authentication-related endpoints.
