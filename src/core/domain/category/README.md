# Category Domain Bundle Context

This bundle context implements the domain logic for categories within the Finvesta application, following the established architectural patterns from the Accounts bundle context.

## Overview

The Category domain represents business categories used to classify transactions and organize financial data. Categories can be of different types (income, expense, investment, transfer) and support custom naming, descriptions, and colors.

## Architecture

This bundle context follows the Domain-Driven Design (DDD) principles and Clean Architecture patterns:

```
src/core/domain/category/
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

- **Category**: The main domain entity representing a financial category

### Value Objects

- **CategoryName**: Immutable category name with validation (2-50 chars, alphanumeric + spaces, hyphens, underscores, ampersands)
- **CategoryType**: Category type with associated properties (income, expense, investment, transfer)
- **CategoryColor**: Hex color value with validation and utility methods
- **CategoryDescription**: Optional description with length validation (max 200 chars)

### Constants

- **CATEGORY_CONSTRAINTS**: Validation rules and limits
- **CATEGORY_TYPES**: Supported category types
- **CATEGORY_TYPE_LABELS**: Human-readable labels for types
- **CATEGORY_TYPE_COLORS**: Semantic colors for types
- **DEFAULT_CATEGORY_COLORS**: Predefined color palette
- **CATEGORY_MESSAGES**: Validation and business rule messages

### Errors

- **Validation Errors**: Name length, invalid characters, description length, color format, type validation
- **Business Errors**: Duplicate names, deletion restrictions, access control, not found scenarios

### Factories

- **CategoryFactory**: Handles creation, updates, and deletion with business rule validation
- **Database Mapping**: Static methods for converting between domain and database formats

### Repositories

- **CategoryRepository**: Interface defining data access contracts
- **User Isolation**: All operations are scoped to specific users
- **Business Rules**: Support for checking usage, duplicates, and ownership

### Services

- **CategoryService**: High-level business operations interface
- **Validation**: Data validation without persistence
- **Statistics**: Usage analytics and reporting
- **Default Categories**: Bulk creation for new users

## Business Rules

1. **Naming**: Categories must have unique names per user (case-insensitive)
2. **Types**: Four supported types: income, expense, investment, transfer
3. **Colors**: Hex color codes with fallback to random default palette
4. **Deletion**: Cannot delete default categories or categories in use
5. **Ownership**: All operations require user ownership validation
6. **Descriptions**: Optional, max 200 characters

## Usage Examples

### Creating a Category

```typescript
import { CategoryFactory } from "@/core/domain/category/factories/category-factory";

const factory = new CategoryFactory(categoryRepository);
const category = await factory.create({
  name: "Groceries",
  description: "Food and household items",
  type: "expense",
  color: "#FF6B6B",
  userId: "user-123",
});
```

### Working with Value Objects

```typescript
import {
  CategoryName,
  CategoryType,
  CategoryColor,
} from "@/core/domain/category/value-objects";

const name = CategoryName.create("Salary");
const type = CategoryType.income();
const color = CategoryColor.createRandom();

console.log(name.getDisplayValue()); // "Salary"
console.log(type.getLabel()); // "Income"
console.log(color.getContrastColor()); // "#000000" or "#FFFFFF"
```

### Type Safety

```typescript
import { Category } from "@/core/domain/category/models/category";

// All properties are readonly and type-safe
const category: Category = {
  id: "cat-123",
  name: CategoryName.create("Food"), // Must be CategoryName instance
  type: CategoryType.expense(), // Must be CategoryType instance
  color: CategoryColor.create("#FF0000"), // Must be CategoryColor instance
  isDefault: false,
  userId: "user-123",
  createdAt: new Date(),
};
```

## Testing

Comprehensive test coverage is provided for all components:

- **Value Objects**: 86 tests covering validation, methods, and edge cases
- **Constants**: 19 tests for consistency and completeness
- **Errors**: 16 tests for error creation and inheritance
- **Models**: 15 tests for interface compliance and integration

Run tests with:

```bash
pnpm test tests/core/domain/category/
```

## Integration

This bundle context integrates with:

- **Features Layer**: Used by category management features
- **Infrastructure**: Repository implementations in infrastructure layer
- **Application Services**: Business logic orchestration
- **UI Components**: Form validation and data display

## Future Enhancements

- **Events**: Domain events for category changes
- **Policies**: Complex business rule validation
- **Validators**: Advanced validation logic
- **Caching**: Performance optimization for frequently accessed data
- **Audit Trail**: Change tracking and history

## Dependencies

- **Lucide React**: Icons for category types
- **TypeScript**: Type safety and interfaces
- **Vitest**: Testing framework
- **Domain Patterns**: Shared domain utilities and patterns
