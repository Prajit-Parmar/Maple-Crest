FROM node:20-alpine AS base

FROM base AS frontend-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=frontend-build /app/.next ./.next
COPY --from=frontend-build /app/public ./public
COPY --from=frontend-build /app/package.json ./package.json
COPY --from=frontend-build /app/next.config.ts ./next.config.ts
COPY --from=frontend-deps /app/node_modules ./node_modules

COPY --from=backend-deps /app/backend/node_modules ./backend/node_modules
COPY backend/ ./backend/

EXPOSE 3000

CMD ["npm", "run", "start"]
