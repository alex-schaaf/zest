FROM node:18-alpine as dev

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV development

COPY . .

RUN yarn --frozen-lockfile
RUN yarn prisma generate

#
# Build
#
FROM node:18-alpine as build

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn build

RUN yarn --frozen-lockfile --production && yarn cache clean

#
# Production
#
FROM node:18-alpine as prod

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
