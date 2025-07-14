"use client";

import { useState } from "react";
import { Button } from "@/features/shared/components/ui/button";
import {
  deleteAccountAction,
  updateAccountAction,
  createAccountAction,
} from "@/features/accounts/actions";
import { toast } from "sonner";

export function AccountDebug() {
  const [testAccountId, setTestAccountId] = useState("");
  const [loading, setLoading] = useState(false);

  const testDelete = async () => {
    if (!testAccountId) {
      toast.error("Please enter an account ID");
      return;
    }

    setLoading(true);
    try {
      console.log("Testing delete for account:", testAccountId);
      const response = await deleteAccountAction({ id: testAccountId });
      console.log("Delete response:", response);

      if (response.success) {
        toast.success("Delete test successful");
      } else {
        toast.error(`Delete test failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Delete test error:", error);
      toast.error("Delete test error - check console");
    } finally {
      setLoading(false);
    }
  };

  const testUpdate = async () => {
    if (!testAccountId) {
      toast.error("Please enter an account ID");
      return;
    }

    setLoading(true);
    try {
      console.log("Testing update for account:", testAccountId);
      const response = await updateAccountAction({
        id: testAccountId,
        name: "Test Updated Name",
        type: "bank",
        provider: "Test Provider",
        balance: 100,
        currency: "EUR",
      });
      console.log("Update response:", response);

      if (response.success) {
        toast.success("Update test successful");
      } else {
        toast.error(`Update test failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Update test error:", error);
      toast.error("Update test error - check console");
    } finally {
      setLoading(false);
    }
  };

  const testCreate = async () => {
    setLoading(true);
    try {
      console.log("Testing create account");
      const response = await createAccountAction({
        name: "Debug Test Account",
        type: "bank",
        provider: "Debug Provider",
        balance: 0,
        currency: "EUR",
      });
      console.log("Create response:", response);

      if (response.success) {
        toast.success(`Create test successful - ID: ${response.data?.id}`);
        setTestAccountId(response.data?.id || "");
      } else {
        toast.error(`Create test failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Create test error:", error);
      toast.error("Create test error - check console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold mb-4">🔧 Account Actions Debug</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Account ID for testing:
          </label>
          <input
            type="text"
            value={testAccountId}
            onChange={(e) => setTestAccountId(e.target.value)}
            placeholder="Enter account ID to test"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={testCreate} disabled={loading}>
            Test Create
          </Button>
          <Button onClick={testUpdate} disabled={loading || !testAccountId}>
            Test Update
          </Button>
          <Button
            onClick={testDelete}
            disabled={loading || !testAccountId}
            variant="destructive"
          >
            Test Delete
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Check browser console for detailed logs. Use Create first to get a test
        account ID.
      </p>
    </div>
  );
}
