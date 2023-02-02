<div align="center">
<h1>zest</h1>
<b><code>zest</code> is an open-source, self-hostable dashboard for your running data.</b>
</div>

## Description

It integrates with services like [Strava](https://strava.com/) by using their APIs to download all available activities and storing in a database.

Integrations:

- [Strava](https://strava.com/)

Integration roadmap:

- [Garmin Connect](https://connect.garmin.com/)

## Getting started

Install dependencies by running `yarn` in the root folder.

1. Start the Postgres database container using `docker compose up`
2. Migrate the Postgres database using `cd apps/backend && npx prisma migrate db`
3. Seed the Postgres database using `npx prisma db seed`
4. Run `yarn dev` in the root folder to run both the API and the frontend dev servers

## Production build

1. `yarn build`
