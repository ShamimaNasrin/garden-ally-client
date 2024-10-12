"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { useResetPassword } from "@/hooks/auth.hook";

const ResetPassword = () => {
  const router = useRouter();
  const { id, token } = router.query; // Extract id and token from query parameters
  const [newPassword, setNewPassword] = useState("");

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation.mutate({
      userId: id as string,
      newPassword,
      token: token as string,
    });
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        <button type="submit" disabled={resetPasswordMutation.isPending}>
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
