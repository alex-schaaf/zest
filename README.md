<div align="center">
<h1>zest</h1>
<b><code>zest</code> is an open-source, self-hostable dashboard for your running data.</b>
</div>

## Description

`zest` integrates with services like [Strava](https://strava.com/), using their
API to download all available running activities and storing them locally in a
PostgreSQL database.

Integrations:

- [x] [Strava](https://strava.com/)
- [ ] [Garmin Connect](https://connect.garmin.com/)
- [ ] Upload `.FIT` file

## Getting started

Install dependencies by running `yarn` in the root folder.

### Project structure

Every folder in the `/apps`folder represents a `yarn`
[workspace](https://yarnpkg.com/features/workspaces).

- `apps/api` contains the Nest.js API
- `apps/web` contains the Vite.js React frontend

Running scripts for the individual workspaces can be done from the root project
folder using `yarn workspace <workspace-name> run <script-name>`. For example
running the apps individually in development mode:

### Development mode

```bash
# start both api and web in dev mode
turbo dev
```

- The API is available at `localhost:3000`, with the Swagger docs accessible at
  `localhost:3000/docs`.
- The frontend is available at `localhost:5173`.

### Testing

#### API

Testing is done using the `jest` testing framework. Tests are stored `*.spec.ts`
files next to the code files they are testing.

```
yarn workspace api run test
```
