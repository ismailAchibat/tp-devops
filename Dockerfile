# Multi-stage build for backend and frontend
FROM node:20-alpine AS builder

# Build backend
WORKDIR /build-backend
COPY backend/package*.json ./
RUN npm ci
COPY backend . 

# Build frontend
WORKDIR /build-frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend . 
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production

# Copy backend
WORKDIR /app/backend
COPY --from=builder /build-backend/package*.json ./
COPY --from=builder /build-backend/node_modules ./node_modules
COPY --from=builder /build-backend . 

# Copy frontend
WORKDIR /app/frontend
COPY --from=builder /build-frontend/.next/standalone ./
COPY --from=builder /build-frontend/.next/static ./.next/static
COPY --from=builder /build-frontend/public ./public
COPY --from=builder /build-frontend/package*.json ./

EXPOSE 3000 3001

CMD ["sh", "-c", "node /app/backend/server.js & exec node /app/frontend/server.js"]
