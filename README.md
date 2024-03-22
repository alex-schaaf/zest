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

Running scripts for the individual workspaces can be done from the root project folder using `yarn workspace <workspace-name> run <script-name>`. For example running the apps individually in development mode:

```bash
# start the api in development mode
yarn workspace api run start:dev

# start the frontend in development mode
yarn workspace frontend run dev
```

### Development mode

The easiest way to get started is to run all `zest` services using Docker compose.

```bash
# run all services: database, api server, vite dev server and nginx reverse proxy
docker compose -f docker-compose.development.yml up
```

This will start up all services in dev mode with the API server available at `localhost:80/api` and the web interface at `localhost:80`. The database can additionally be accesses at `localhost:5432`.
