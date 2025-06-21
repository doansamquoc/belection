import type { UserType } from "./UserType";

export interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
