FROM node:12.16.1-alpine AS builder
WORKDIR /angDock
COPY . .
RUN npm i
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /angDock/dist/angDock/ /usr/share/nginx/html