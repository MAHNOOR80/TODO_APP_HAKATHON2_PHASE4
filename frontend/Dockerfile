# Frontend Dockerfile - Vite/React (SPA) with API Link
# Phase 4: Cloud-Native Kubernetes Deployment

# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# --- CRITICAL: Accept API URL during build ---
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# ---------------------------------------------

RUN npm run build

# ============================================
# Stage 2: Production Runner (Nginx)
# ============================================
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config for React Router
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /health { \
        access_log off; \
        add_header Content-Type text/plain; \
        return 200 "healthy"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]