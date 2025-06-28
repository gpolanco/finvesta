"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  AuthState,
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/features/auth/types";
import type { Session } from "@supabase/supabase-js";

interface AuthContextValue extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Convert Supabase user to our User type
  const mapSupabaseUser = (session: Session | null): User | null => {
    if (!session?.user) return null;

    return {
      id: session.user.id,
      email: session.user.email!,
      name: session.user.user_metadata?.name || session.user.email!,
      avatar_url: session.user.user_metadata?.avatar_url,
      created_at: session.user.created_at,
    };
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: mapSupabaseUser(session),
        loading: false,
        error: null,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: mapSupabaseUser(session),
        loading: false,
        error: null,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        },
      },
    });

    if (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  };

  const signOut = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
