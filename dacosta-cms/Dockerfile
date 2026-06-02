# Stage 1: install deps with build tools (needed for better-sqlite3 native addon)
FROM node:20-bookworm-slim AS deps
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: build admin panel
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node_modules/.bin/strapi build

# Stage 3: production image
FROM node:20-bookworm-slim AS runner
RUN apt-get update && apt-get install -y libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
EXPOSE 1337
CMD ["node_modules/.bin/strapi", "start"]