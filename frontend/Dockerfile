# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package configuration and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Pass build environment variables
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

# Build production distribution
RUN npm run build

# Runtime Stage (Nginx Web Server)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clear default nginx static assets
RUN rm -rf ./*

# Copy build artifacts from build stage
COPY --from=build /app/dist .

# Copy custom Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
