import { createClient, type Session } from "@supabase/supabase-js";
import type { Progress } from "../types";

/**
 * Optional cloud sync. The app is fully usable signed-out and offline; this
 * module only activates when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are
 * set at build time. Those values are designed to be public in a client app —
 * Row-Level Security on the backend is what protects each user's data.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const cloudEnabled = Boolean(url && anonKey);

const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb: (session: Session | null) => void): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    cb(session),
  );
  return () => data.subscription.unsubscribe();
}

/** Send a passwordless magic-link sign-in email. */
export async function sendMagicLink(email: string): Promise<void> {
  if (!supabase) throw new Error("Cloud sync is not configured.");
  const redirect = window.location.origin + import.meta.env.BASE_URL;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirect },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  if (supabase) await supabase.auth.signOut();
}

const TABLE = "progress";

/** Read this user's stored progress blob, or null if they have none yet. */
export async function pullProgress(userId: string): Promise<Progress | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data?.data as Progress | undefined) ?? null;
}

/** Upsert this user's progress blob (one row per user, keyed by user_id). */
export async function pushProgress(
  userId: string,
  progress: Progress,
): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from(TABLE)
    .upsert({ user_id: userId, data: progress }, { onConflict: "user_id" });
  if (error) throw error;
}
