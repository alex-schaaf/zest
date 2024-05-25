FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
WORKDIR /app
ENV NODE_ENV production
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn --frozen-lockfile

FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN yarn global add turbo
RUN turbo run build --scope=web --include-dependencies --no-deps

FROM nginx:stable-alpine AS runner
WORKDIR /app
COPY --from=sourcer /app/apps/web/dist /usr/share/nginx/html
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]