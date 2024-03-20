FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV development

COPY . .

RUN yarn --frozen-lockfile

#
# Build
#
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean

#
# Production
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
