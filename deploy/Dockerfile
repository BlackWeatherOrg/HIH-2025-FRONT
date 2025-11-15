FROM node:22 AS builder

WORKDIR /front

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY /deploy/nginx.conf /etc/nginx/conf.d

COPY --from=builder /front/build /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
