# 💰 Finvesta - Personal Finance Management

A modern personal finance management application built with Next.js 15, React 19, and Supabase.

## 🎯 Project Status

**Current Phase**: Task 002 - Accounts & Transactions ✅ **ADVANCED**  
**Progress**: 70% - Ready for account editing implementation

### ✅ Completed

- Authentication & Database setup
- Categories system with full CRUD
- Account management (view/create)
- **Centralized types system** (account types, currencies, colors, icons)
- English-first UI with consistent patterns

### 🔄 Next Steps

- Account editing functionality
- Transaction filters & search
- Dashboard KPIs

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 + React 19 + TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Language**: TypeScript (strict mode)
- **Forms**: react-hook-form + Zod validation
- **Testing**: Vitest + React Testing Library
- **Package Manager**: pnpm

## 🏗️ Architecture

### Folder Structure

```
src/features/
├── shared/          # Common utilities, types, components
├── auth/            # Authentication
├── accounts/        # Account management
├── categories/      # Category management
├── transactions/    # Transaction management
└── dashboard/       # Dashboard and KPIs
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

#### **3. Visual Consistency**

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
- **Accounts**: Bank, crypto, investment, savings, cash accounts
- **Categories**: Custom categories with colors and types
- **Transactions**: Full CRUD with category assignment
- **UI**: Responsive, accessible, mobile-first design

### ⏳ Planned

- **Dashboard**: Financial KPIs and charts
- **Alerts**: Balance notifications and limits
- **Reports**: Monthly/yearly financial summaries
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

## 🔮 Roadmap

### Phase 1: Foundation ✅

- [x] Setup, authentication, database schema
- [x] UI components and type system

### Phase 2: Core Features (Current)

- [x] Categories and account management
- [ ] Account editing ← **NEXT**
- [ ] Advanced transaction features

### Phase 3: Intelligence

- [ ] Dashboard with KPIs
- [ ] Financial alerts and goals
- [ ] Reporting system

## 📚 Documentation

- **Tasks**: `/tasks/` - Project roadmap and detailed progress
- **Component docs**: Inline JSDoc + TypeScript
- **API**: Supabase auto-generated types

## 💰 Financial Context

Managing personal finances with:

- 22.000€ target liquidity + 10.000€ crypto
- 3.730€/month income, 1.500€/month savings goal
- Multiple account types (bank, crypto, investments)

---

**Built with modern architecture, type safety, and user experience in mind.**
