FROM node:20-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Nginx configs
FROM nginx:stable-alpine

# Setup NGINX with config
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Move all build files to NGINX serve folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

