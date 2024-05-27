# Darts App

This is a Darts application built with Next.js and Supabase. It's designed to provide a seamless experience for darts enthusiasts, allowing them to track their games, scores, and progress over time.

## Features

- User authentication with Supabase
- Game tracking and statistics
- Real-time updates with Supabase Realtime
- Styling with Tailwind CSS

## Getting Started

To get the app running locally:

1. Clone the repository to your local machine

```
git clone https://github.com/yourusername/darts-app.git
```

2. Change into the app's directory

   ```
   cd darts-app
   ```

3. Install the dependencies

   ```
   npm install
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```
   npm run dev
   ```

   The app should be running on [localhost:3000](http://localhost:3000/).

6. Run supabase locally

If you also want to run Supabase locally, check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development)

## Feedback and issues

Please file feedback and issues over on the [GitHub repo](https://github.com/axelcedercreutz/darts-app/issues/new).

