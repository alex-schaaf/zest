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

#
# Production
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN apk update
RUN apd add nginx -y

COPY --from=build /app/dist /var/www/html/

CMD ["nginx", "-g", "daemon off;"]
