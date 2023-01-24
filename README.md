# project self-fit

## Getting started

Install dependencies by running `yarn` in the root folder.

1. Start the Postgres database container using `docker compose up`
2. Migrate the Postgres database using `cd apps/backend && npx prisma migrate db`
3. Seed the Postgres database using `npx prisma db seed`
4. Run `yarn dev` in the root folder to run both the API and the frontend dev servers
