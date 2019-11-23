# Build container
FROM node:current-alpine as builder
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

# Output container
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html