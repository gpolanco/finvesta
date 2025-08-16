# 💰 Finvesta - Personal Finance Management

A modern personal finance management application built with Next.js 15, React 19, and Supabase.

## 🎯 Project Status

**Current Phase**: Dashboard & KPIs Development 🚀 **READY TO START**  
**Progress**: Core features completed, ready for dashboard implementation

### ✅ Completed

- Authentication & Database setup
- Categories system with full CRUD **+ Transfer Categories** ✅
- Account management (complete CRUD including editing) ✅
- Transaction management (complete CRUD with filters & search) ✅
- **Centralized types system** (account types, currencies, colors, icons) ✅
- **Consistent architecture**: All transaction types require categories ✅
- English-first UI with established patterns ✅

### 🔄 Next Steps

- **Dashboard KPIs** ← **CURRENT FOCUS**
  - Transform placeholder dashboard into functional financial dashboard
  - Implement real-time account balance summaries
  - Add monthly income/expense charts
  - Create savings goal progress tracking
- Financial alerts
- Reports system

## 🎯 **Current Status & Next Steps**

### ✅ **What's Working Right Now**

- **Complete Account System**: Create, read, update, delete with balance validation
- **Complete Transaction System**: Full CRUD with advanced filtering and search
- **Complete Category System**: Income, expense, investment, and transfer categories
- **Advanced Filters**: Search by description, filter by account, category, type, and date range
- **Transfer Categories**: Account Transfer, Investment Rebalancing, Loan Payment, Savings Allocation
- **Consistent Architecture**: All transaction types work uniformly with categories

### 🚀 **Next Major Task: Dashboard KPIs**

**Objective**: Transform the current placeholder dashboard into a functional financial dashboard with real KPIs.

**What needs to be built**:

- Real-time account balance summaries
- Monthly income/expense charts
- Savings goal progress tracking
- Transaction trend analysis
- Financial health indicators

**Current dashboard state**: Only contains placeholder components (`SectionCards`, `ChartAreaInteractive`, `DataTable`)

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 + React 19 + TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Language**: TypeScript (strict mode)
- **Architecture**: Domain-Driven Design (DDD) with Clean Architecture
- **Forms**: react-hook-form + Zod validation
- **Testing**: Vitest + React Testing Library
- **Package Manager**: pnpm

## 🏗️ Architecture

### Folder Structure

```
src/
├── core/                    # Domain-driven design core
│   ├── domain/             # Business logic and domain models
│   │   ├── accounts/       # Account domain (models, value objects, services)
│   │   ├── categories/     # Category domain
│   │   └── transactions/   # Transaction domain
│   └── infrastructure/     # External concerns (database, external APIs)
├── features/                # Feature-based organization
│   ├── shared/             # Common utilities, types, components
│   ├── auth/               # Authentication
│   ├── accounts/           # Account management
│   ├── categories/         # Category management
│   ├── transactions/       # Transaction management
│   └── dashboard/          # Dashboard and KPIs
└── lib/                     # Shared libraries and utilities
```

### 🎯 Established Patterns

#### **1. Centralized Types**

- Account types with colors, icons, and utilities
- Currency types with validation
- English-first development
- Single source of truth for constants

#### **2. UI Patterns**

- `useOptimistic` for instant UX (create/update)
- `FormDialog` for reusable modal forms
- Server actions with clean error handling
- Toast notifications for feedback
- Confirmation modals for destructive actions

#### **3. System Consistency** 🆕

- All transaction types require categories (no special cases)
- Prefer consistent architecture over conditional logic
- Transfer categories: Account Transfer, Investment Rebalancing, Loan Payment, Savings Allocation

#### **4. Visual Consistency**

```typescript
// Centralized styling
const IconComponent = getAccountTypeIcon(account.type);
const colors = getAccountTypeColors(account.type);
const label = getAccountTypeLabel(account.type);
```

Account type colors:

```
BANK: blue    CRYPTO: yellow    INVESTMENT: green
SAVINGS: purple    CASH: gray
```

### 🏛️ **Domain-Driven Design Architecture**

**Core Domain Layer** (`@core/domain/`):

- **Value Objects**: Immutable business concepts (AccountType, Currency, AccountBalance)
- **Domain Models**: Business entities with business rules
- **Domain Services**: Business logic that doesn't belong to entities
- **Domain Events**: Business events for decoupling

**Infrastructure Layer** (`@core/infrastructure/`):

- **Repositories**: Data access abstractions
- **External Services**: Third-party integrations
- **Database**: Schema and data persistence
- **Configuration**: Environment and external configs

**Feature Layer** (`@features/`):

- **UI Components**: React components and pages
- **Application Services**: Use cases and orchestration
- **Server Actions**: Next.js server-side operations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+, pnpm, Supabase account

### Setup

```bash
# Clone and install
git clone [repository-url]
cd finvesta
pnpm install

# Environment setup
cp .env.local.example .env.local
# Add your Supabase credentials

# Run development
pnpm dev
```

### Key Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm test         # Run tests
pnpm lint         # Code linting
```

## 📊 Features

### ✅ Implemented

- **Authentication**: Email/password with Supabase Auth
- **Accounts**: Bank, crypto, investment, savings, cash accounts (complete CRUD)
- **Categories**: Custom categories with colors and types (income, expense, investment, **transfer** ✅)
- **Transactions**: Full CRUD with consistent category assignment for all types ✅
- **Advanced Filters**: Search, account, category, type, and date range filtering ✅
- **UI**: Responsive, accessible, mobile-first design with established patterns

### ⏳ Planned

- **Dashboard**: Financial KPIs and charts (Task 003) ← **NEXT**
- **Alerts**: Balance notifications and limits (Task 004)
- **Reports**: Monthly/yearly financial summaries (Task 005)
- **Advanced**: Data export, analytics, PWA

## 🤝 Development Guidelines

### Code Patterns

```typescript
// ✅ Use centralized types
import { ACCOUNT_TYPES, getAccountTypeIcon } from "@/features/shared/types";

// ✅ English-first approach
const errorMessage = "Account name is required";

// ✅ Descriptive naming
const handleAccountUpdate = () => {
  /* ... */
};
```

### Git Commits

```bash
git commit -m "feat(accounts): add centralized account types

- Centralize account types and colors
- Add utility functions
- Update components to use centralized types

Don't forget to commit!"
```

## 📚 Documentation

- **Project Tasks & Progress**: `/tasks/` - Detailed project roadmap and current status
- **Component docs**: Inline JSDoc + TypeScript
- **API**: Supabase auto-generated types

---

**Built with modern architecture, type safety, and user experience in mind.**
