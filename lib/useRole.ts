import { useUser } from "@clerk/clerk-expo";

export type UserRole = "admin" | "trainer" | "user";

export function useRole() {
  const { user } = useUser();

  const role = (user?.publicMetadata?.role as UserRole) || "user";

  const isAdmin = role === "admin";
  const isTrainer = role === "trainer" || role === "admin";
  const isUser = role === "user";

  return {
    role, isAdmin, isTrainer, isUser,
  };
}