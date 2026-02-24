**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_FUNCTIONS_VERSION=your_functions_version
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_FUNCTIONS_VERSION=v1
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

## Base44 + Vercel deployment checklist

`src/lib/app-params.js` reads these variables from `import.meta.env`, and `src/api/base44Client.js` passes them into `createClient`:

- `VITE_BASE44_APP_ID`
- `VITE_BASE44_FUNCTIONS_VERSION`
- `VITE_BASE44_APP_BASE_URL`

For Vercel:

1. Open **Project Settings → Environment Variables**.
2. Add/update all three variables above for both **Production** and **Preview**.
3. Redeploy (or trigger a new deployment) so frontend build picks up updated `VITE_*` values.

Function endpoints expected by this repo:

- Required: `functions/submitStory.ts` (invoked from `StorySubmitForm.jsx` as `submitStory`)
- Optional multipart flow: `functions/submitStoryWithMedia.ts`

## End-to-end validation checklist

After redeploy:

1. Open the Story submit page and complete all required fields.
2. Submit and confirm the request returns success.
3. Verify the created story record has the expected `status` (`approved` in current function implementation).
4. Confirm the new story appears in Story list (or moderation queue if your backend logic is changed).

Run the app: `npm run dev`

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)


## Supabase setup for global Story Sharing (no Base44 backend required)

If you want stories to be visible to everyone, set these env vars:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create table `public.stories` in Supabase SQL editor:

```sql
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author_name text not null,
  content text not null,
  topic text not null,
  media_urls jsonb not null default '[]'::jsonb,
  audio_url text,
  summary text,
  tags jsonb not null default '[]'::jsonb,
  status text not null default 'approved',
  comments_count integer not null default 0,
  likes integer not null default 0,
  featured boolean not null default false,
  source text not null default 'supabase',
  created_date timestamptz not null default now()
);

alter table public.stories enable row level security;

create policy "stories are readable by everyone"
  on public.stories
  for select
  using (true);

create policy "stories are insertable by everyone"
  on public.stories
  for insert
  with check (true);

create policy "stories likes are updatable by everyone"
  on public.stories
  for update
  using (true)
  with check (true);
```

The app still keeps localStorage fallback for offline/local-only mode.
