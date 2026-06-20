# Privacy

This is an independent study aid. Privacy is simple here because the app does as
little as possible with your data.

## If you don't sign in (the default)

**Nothing leaves your device.** Your practice progress is stored locally in your
browser (IndexedDB / localStorage). There is no account, no tracking, no
analytics, and no network calls for your data.

## If you choose to sign in (optional cloud sync)

Signing in is entirely optional and only exists to sync your progress across
your own devices. If you do:

- **What's collected:** your email address (to sign you in via a magic link) and
  your study progress (which questions you've answered, scores, and review
  state). No question content about *you* personally is collected — just your
  practice history.
- **How it's used:** solely to save and sync your progress to your own account.
  It is **not** sold, shared, or used for advertising.
- **Where it's stored:** in the app's backend (Supabase), under your account,
  protected by row-level security so **only you** can read your data.
- **Deletion:** sign out anytime; use **Reset all progress** in the app to clear
  local data; to delete your account data, contact the repository owner via the
  project's GitHub page.

## Not affiliated

This tool is not affiliated with the Oregon CCB, PSI, or any licensing body, and
is not legal advice.
