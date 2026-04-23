import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginUser, getMe } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
      authError: null,

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      clearAuthError: () => set({ authError: null }),

      login: async (credentials) => {
        set({
          isAuthLoading: true,
          authError: null,
        });

        try {
          const response = await loginUser(credentials);

          set({
            token: response.accessToken,
            user: response.user,
            isAuthenticated: true,
            isAuthLoading: false,
            authError: null,
          });

          return response;
        } catch (error) {
          set({
            isAuthLoading: false,
            authError:
              error?.response?.data?.message ||
              error?.message ||
              "Login failed",
          });
          throw error;
        }
      },

      fetchMe: async () => {
        const token = get().token;
        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
          });
          return null;
        }

        set({
          isAuthLoading: true,
          authError: null,
        });

        try {
          const response = await getMe();
          set({
            user: response.user,
            isAuthenticated: true,
            isAuthLoading: false,
          });
          return response;
        } catch (error) {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isAuthLoading: false,
            authError:
              error?.response?.data?.message ||
              error?.message ||
              "Authentication failed",
          });
          throw error;
        }
      },

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isAuthLoading: false,
          authError: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);