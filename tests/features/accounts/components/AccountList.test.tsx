import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { AccountList } from "@/features/accounts/components/account-list";
import { useAuth } from "@/features/auth/context/auth-context";
import { createClient } from "@/lib/supabase/client";

// Mock de dependencias
vi.mock("@/features/auth/context/auth-context");
vi.mock("@/lib/supabase/client");

const mockUseAuth = vi.mocked(useAuth);
const mockCreateClient = vi.mocked(createClient);

// Mock de datos
const mockAccounts = [
  {
    id: "1",
    user_id: "user-1",
    name: "Cuenta Corriente",
    type: "bank" as const,
    provider: "BBVA",
    balance: 1500.5,
    currency: "EUR",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    user_id: "user-1",
    name: "Binance",
    type: "crypto" as const,
    provider: "Binance",
    balance: 2000.75,
    currency: "EUR",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

const mockSupabaseClient = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
};

describe("AccountList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockCreateClient.mockReturnValue(mockSupabaseClient as any);
  });

  it("renders loading skeleton when loading", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com" },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    mockSupabaseClient.order.mockResolvedValue({
      data: mockAccounts,
      error: null,
    });

    render(<AccountList />);

    expect(screen.getByLabelText("Cargando cuentas")).toBeInTheDocument();
    expect(screen.getAllByLabelText("Cargando cuenta")).toHaveLength(3);
  });

  it("renders accounts list successfully", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com" },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    mockSupabaseClient.order.mockResolvedValue({
      data: mockAccounts,
      error: null,
    });

    render(<AccountList />);

    await waitFor(() => {
      expect(screen.getByText("Cuenta Corriente")).toBeInTheDocument();
      expect(screen.getByText("Binance")).toBeInTheDocument();
      expect(screen.getByText("BBVA")).toBeInTheDocument();
      expect(screen.getByText("€1.500,50")).toBeInTheDocument();
      expect(screen.getByText("€2.000,75")).toBeInTheDocument();
    });

    expect(
      screen.getByLabelText("Lista de 2 cuentas financieras")
    ).toBeInTheDocument();
  });

  it("shows empty state when no accounts", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com" },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    mockSupabaseClient.order.mockResolvedValue({
      data: [],
      error: null,
    });

    render(<AccountList />);

    await waitFor(() => {
      expect(
        screen.getByText("No tienes cuentas registradas")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Añade tu primera cuenta para empezar/)
      ).toBeInTheDocument();
    });
  });

  it("shows error state when fetch fails", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com" },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    mockSupabaseClient.order.mockResolvedValue({
      data: null,
      error: { message: "Database error" },
    });

    render(<AccountList />);

    await waitFor(() => {
      expect(
        screen.getByText("Error al cargar las cuentas")
      ).toBeInTheDocument();
      expect(screen.getByText("Intentar de nuevo")).toBeInTheDocument();
    });
  });

  it("shows login required when no user", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    render(<AccountList />);

    expect(
      screen.getByText("Debes iniciar sesión para ver tus cuentas")
    ).toBeInTheDocument();
  });

  it("renders account types with correct badges", async () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com" },
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    });

    mockSupabaseClient.order.mockResolvedValue({
      data: mockAccounts,
      error: null,
    });

    render(<AccountList />);

    await waitFor(() => {
      expect(screen.getByText("Banco")).toBeInTheDocument();
      expect(screen.getByText("Cripto")).toBeInTheDocument();
    });
  });
});
