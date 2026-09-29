# Nurse Lizzy Health — Admin Studio setup

The private workspace lives at `/admin`. Its custom login uses Supabase Auth; the dashboard writes content records to a Supabase Postgres table protected by Row Level Security. No admin password or service-role key belongs in the website code or in chat.

## 1. Create a Supabase project

Create a project in Supabase and note its **Project URL** and **anon/public** key (or the current publishable key). The browser-visible key is designed to be used with strict RLS policies; never use or publish a `service_role` / secret key in `NEXT_PUBLIC_*` variables.

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL` — the owner email, set only in the local/server environment, not in source code.

Restart the Next.js app after changing environment variables.

## 2. Create the content table and policies

In the Supabase SQL Editor, run `supabase/migrations/20260929_admin_content.sql`. This creates `public.admin_content`, enables RLS, allows only published rows to be read publicly, and allows writes only from an authenticated account with `app_metadata.role = admin`.

## 3. Create the owner account securely

In Supabase **Authentication → Users**, invite the owner using the owner email from your private environment settings. Open the invitation from the owner's email and choose a private password there—never send it in chat.

After the user exists, grant the protected app-metadata role. In the Supabase SQL Editor, replace the email placeholder with the owner address and run:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where lower(email) = lower('REPLACE_WITH_OWNER_EMAIL');
```

The site checks both the server-only `ADMIN_EMAIL` allowlist and the non-user-editable app-metadata role. Do not set this role in `user_metadata`.

## 4. Configure auth redirects

In Supabase **Authentication → URL Configuration**, add the local callback `http://localhost:3000/auth/callback` and the production callback `https://YOUR-DOMAIN/auth/callback` to the allowed redirect URLs. Also set the correct production Site URL. The password reset flow returns through the same callback.

For deployment, add the three environment variables in the hosting provider's **server/runtime environment settings**, then redeploy. The real owner email stays private in that settings panel.

## 5. Current scope and remaining connection

The secure admin route, sign-in/reset-password UI, CRUD workspace, table schema and RLS policy are in place. The dashboard currently saves to the private `admin_content` library. **The existing public site still reads its current content from project files, so editing or marking a record “Published” in this first admin version does not yet change the public site.** The next integration step is to migrate the existing articles, guides, pages and resources into this store (with a fallback to existing content), then have public routes read published records. Do not promise live publishing until that integration is complete.

Selar remains the checkout/file-delivery provider. The admin editor can store a guide's Selar URL and price; the public guide buttons also need to be wired to those published records as part of the public sync step.

## Safety notes

- Do not put a Supabase `service_role` key in browser code, `.env.example`, or any `NEXT_PUBLIC_*` variable.
- `.env.local` is ignored by Git. Do not commit it.
- Do not share an admin password, reset link, or service-role key in chat.
- Use a unique password of at least 12 characters and enable MFA on the Supabase owner account if available.
