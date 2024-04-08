<div align="center">
<h1>zest</h1>
<b><code>zest</code> is an open-source, self-hostable dashboard for your running data.</b>
</div>

<br/><br/>

![screenshot-dashboard-view](https://user-images.githubusercontent.com/17277800/218068883-73c3d83a-d129-4514-966f-1d3bce9263de.png)

![screenshot-calendar-view](https://user-images.githubusercontent.com/17277800/218068898-39045970-5dfc-4d5e-8b8b-f93fb1857c0e.png)

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
- `apps/frontend` contains the Vite.js React frontend

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
