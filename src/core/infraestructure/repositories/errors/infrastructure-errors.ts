import { AccountNotFoundError } from "@/core/domain/accounts/errors";
import { CategoryNotFoundError } from "@/core/domain/category/errors";
import { TransactionNotFoundError } from "@/core/domain/transaction/errors";

/**
 * Infrastructure-specific errors that extend domain errors
 * These errors are thrown when database operations fail
 */

export class DatabaseConnectionError extends Error {
  constructor(message: string, cause?: Error) {
    super(`Database connection error: ${message}`);
    this.name = "DatabaseConnectionError";
    this.cause = cause;
  }
}

export class DatabaseOperationError extends Error {
  constructor(operation: string, entity: string, cause?: Error) {
    super(`Database operation '${operation}' failed for ${entity}`);
    this.name = "DatabaseOperationError";
    this.cause = cause;
  }
}

export class EntityNotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} with id '${id}' not found`);
    this.name = "EntityNotFoundError";
  }
}

export class DuplicateEntityError extends Error {
  constructor(entity: string, field: string, value: string) {
    super(`${entity} with ${field} '${value}' already exists`);
    this.name = "DuplicateEntityError";
  }
}

export class ValidationError extends Error {
  constructor(entity: string, field: string, message: string) {
    super(`Validation error for ${entity}.${field}: ${message}`);
    this.name = "ValidationError";
  }
}

// Specific entity not found errors that extend domain errors
export class AccountNotFoundInDatabaseError extends AccountNotFoundError {
  constructor(id: string) {
    super();
    this.message = `Account with id '${id}' not found in database`;
  }
}

export class CategoryNotFoundInDatabaseError extends CategoryNotFoundError {
  constructor(id: string) {
    super();
    this.message = `Category with id '${id}' not found in database`;
  }
}

export class TransactionNotFoundInDatabaseError extends TransactionNotFoundError {
  constructor(id: string) {
    super();
    this.message = `Transaction with id '${id}' not found in database`;
  }
}
