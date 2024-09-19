FROM node:20-alpine AS base
WORKDIR /app

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# Install dependencies based on the preferred package manager
COPY ./next/package.json ./next/package-lock.json ./

# Omit --production flag for TypeScript devDependencies
RUN npm ci

# FROM base AS builder
COPY ./next .
COPY ./next/.env.production .
# COPY --from=deps /app/node_modules ./node_modules

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN npm run build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here
# Step 2. Production image, copy all the files and run next
FROM base AS runner

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]