# Transaction Domain Bundle Context

This bundle context implements the domain logic for transactions within the Finvesta application, following the established architectural patterns from the Accounts and Category bundle contexts.

## Overview

The Transaction domain represents financial transactions that occur between accounts and categories. Transactions can be of different types (income, expense, investment, transfer) and support detailed tracking of amounts, descriptions, dates, and reconciliation status.

## Architecture

This bundle context follows the Domain-Driven Design (DDD) principles and Clean Architecture patterns:

```
src/core/domain/transaction/
├── constants/          # Domain constants and constraints
├── errors/            # Domain-specific error classes
├── events/            # Domain events (placeholder)
├── factories/         # Domain object factories
├── models/            # Core domain models
├── policies/          # Business policies (placeholder)
├── repositories/      # Repository interfaces
├── services/          # Domain service interfaces
├── validators/        # Validation logic (placeholder)
└── value-objects/     # Immutable value objects
```

## Core Components

### Models

- **Transaction**: The main domain entity representing a financial transaction

### Value Objects

- **TransactionAmount**: Immutable transaction amount with validation (-999,999,999 to 999,999,999, 2 decimal places)
- **TransactionDescription**: Transaction description with validation (1-200 chars, alphanumeric + spaces, hyphens, underscores, periods, commas, exclamation marks, question marks, parentheses)
- **TransactionType**: Transaction type with associated properties (income, expense, investment, transfer)
- **TransactionDate**: Date value object with validation (1900-2100 range) and utility methods

### Constants

- **TRANSACTION_CONSTRAINTS**: Validation rules and limits for amounts, descriptions, and dates
- **TRANSACTION_TYPES**: Supported transaction types
- **TRANSACTION_TYPE_LABELS**: Human-readable labels for types
- **TRANSACTION_TYPE_COLORS**: Semantic colors for types
- **TRANSACTION_TYPE_ICONS**: Lucide React icons for types
- **TRANSACTION_TYPE_BADGE_COLORS**: Tailwind CSS classes for badges
- **TRANSACTION_TYPE_ICON_COLORS**: Tailwind CSS classes for icon colors
- **TRANSACTION_TYPE_AMOUNT_COLORS**: Tailwind CSS classes for amount colors
- **TRANSACTION_TYPE_PRIMARY_COLORS**: Primary color names for types
- **TRANSACTION_TYPE_AMOUNT_PREFIXES**: Amount display prefixes (+, -, empty)
- **TRANSACTION_MESSAGES**: Validation and business rule messages

### Errors

- **Validation Errors**: Description length, invalid characters, amount validation, date validation, type validation
- **Business Errors**: Account not found, category not found, insufficient balance, reconciliation restrictions, access control

### Factories

- **TransactionFactory**: Handles creation, updates, and deletion with business rule validation
- **Database Mapping**: Static methods for converting between domain and database formats
- **Balance Validation**: Checks sufficient account balance for expenses
- **Reconciliation Management**: Handles transaction reconciliation status

### Repositories

- **TransactionRepository**: Interface defining data access contracts
- **User Isolation**: All operations are scoped to specific users
- **Advanced Queries**: Support for date ranges, pagination, statistics, and analytics
- **Balance Management**: Methods for checking and calculating account balances

### Services

- **TransactionService**: High-level business operations interface
- **Validation**: Data validation without persistence
- **Statistics**: Comprehensive transaction analytics and reporting
- **Search & Filtering**: Advanced transaction search and filtering capabilities
- **Bulk Operations**: Support for bulk transaction creation

## Business Rules

1. **Amounts**: Must be finite numbers between -999,999,999 and 999,999,999 with 2 decimal places
2. **Descriptions**: Required, 1-200 characters, limited character set for security
3. **Types**: Four supported types: income, expense, investment, transfer
4. **Dates**: Must be valid dates between 1900 and 2100
5. **Balance**: Cannot create expenses that exceed account balance
6. **Reconciliation**: Reconciled transactions cannot be deleted
7. **Ownership**: All operations require user ownership validation
8. **Account Validation**: Account must exist and belong to user
9. **Category Validation**: Category must exist and belong to user

## Usage Examples

### Creating a Transaction

```typescript
import { TransactionFactory } from "@/core/domain/transaction/factories/transaction-factory";

const factory = new TransactionFactory(transactionRepository);
const transaction = await factory.create({
  accountId: "acc-123",
  categoryId: "cat-456",
  amount: -75.5,
  description: "Grocery shopping",
  transactionType: "expense",
  transactionDate: "2024-01-15",
  userId: "user-123",
});
```

### Working with Value Objects

```typescript
import {
  TransactionAmount,
  TransactionType,
  TransactionDate,
} from "@/core/domain/transaction/value-objects";

const amount = TransactionAmount.create(-75.5);
const type = TransactionType.expense();
const date = TransactionDate.today();

console.log(amount.toFormattedString("USD")); // "-$75.50"
console.log(type.getAmountPrefix()); // "-"
console.log(date.toDisplayString()); // "Today"
```

### Type Safety

```typescript
import { Transaction } from "@/core/domain/transaction/models/transaction";

// All properties are readonly and type-safe
const transaction: Transaction = {
  id: "txn-123",
  accountId: "acc-123",
  categoryId: "cat-456",
  amount: TransactionAmount.create(-75.5), // Must be TransactionAmount instance
  description: TransactionDescription.create("Food"), // Must be TransactionDescription instance
  transactionType: TransactionType.expense(), // Must be TransactionType instance
  transactionDate: TransactionDate.create("2024-01-15"), // Must be TransactionDate instance
  isReconciled: false,
  userId: "user-123",
  createdAt: new Date(),
};
```

## Advanced Features

### Transaction Analytics

```typescript
// Get monthly totals
const monthlyTotals = await transactionService.getMonthlyTotals(
  "user-123",
  2024
);

// Get transaction statistics
const stats = await transactionService.getTransactionStats("user-123");

// Get period summaries
const summary = await transactionService.getTransactionSummaryByPeriod(
  "user-123",
  "month",
  "2024-01-01"
);
```

### Search and Filtering

```typescript
// Search by description
const results = await transactionService.searchTransactionsByDescription(
  "user-123",
  "grocery",
  10
);

// Get transactions with pagination
const page = await transactionService.getTransactionsWithPagination(
  "user-123",
  1,
  20
);
```

### Balance Management

```typescript
// Check account balance
const hasBalance = await transactionService.checkAccountBalance(
  "user-123",
  "acc-123",
  100.0
);

// Get balance after transaction
const balance = await transactionService.getAccountBalanceAfterTransaction(
  "user-123",
  "acc-123",
  "txn-123"
);
```

## Testing

Comprehensive test coverage is provided for all components:

- **Value Objects**: 45 tests covering validation, methods, and edge cases
- **Constants**: Tests for consistency and completeness
- **Errors**: Tests for error creation and inheritance
- **Models**: Tests for interface compliance and integration

Run tests with:

```bash
pnpm test tests/core/domain/transaction/
```

## Integration

This bundle context integrates with:

- **Features Layer**: Used by transaction management features
- **Infrastructure**: Repository implementations in infrastructure layer
- **Application Services**: Business logic orchestration
- **UI Components**: Form validation, data display, and analytics
- **Account Domain**: Balance validation and account operations
- **Category Domain**: Category validation and type matching

## Future Enhancements

- **Events**: Domain events for transaction changes
- **Policies**: Complex business rule validation
- **Validators**: Advanced validation logic
- **Caching**: Performance optimization for frequently accessed data
- **Audit Trail**: Change tracking and history
- **Recurring Transactions**: Support for scheduled transactions
- **Transaction Templates**: Predefined transaction patterns
- **Import/Export**: Bulk transaction operations

## Dependencies

- **Lucide React**: Icons for transaction types
- **TypeScript**: Type safety and interfaces
- **Vitest**: Testing framework
- **Domain Patterns**: Shared domain utilities and patterns
- **Account Domain**: For balance validation
- **Category Domain**: For category validation
