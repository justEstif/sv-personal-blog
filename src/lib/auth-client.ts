import { createAuthClient } from "better-auth/svelte";
import { adminClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  plugins: [adminClient(), usernameClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword,
  resetPassword,
} = authClient;
