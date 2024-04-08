FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/apps/api/prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn prisma generate

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn global add turbo
RUN turbo build --filter=api...

FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

CMD ["node", "apps/api/dist/src/main.js"]
