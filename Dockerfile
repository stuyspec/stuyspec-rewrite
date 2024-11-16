# Double-container Dockerfile for separated build process.

FROM node:18-alpine AS deps

# libc is needed for deps
RUN apk add --no-cache libc6-compat

# Copy over ONLY the package.json and package-lock.json
WORKDIR /app
COPY package*.json ./
RUN npm ci 

# END DEPS IMAGE

# container to handle our Build
FROM node:18-alpine AS BUILD_IMAGE

# Set up our work directory again
WORKDIR /app

# Bring over installed deps and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.local .

RUN npm run build


# END OF BUILD_IMAGE

# This starts our application's run image - the final output of build.
FROM node:18-alpine

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Pull the built files out of BUILD_IMAGE - we need:
# 1. the package.json and yarn.lock
# 2. the Next build output and static files
# 3. the node_modules.
WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package*.json ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next

# 4. the next.config.js
# 5. the .env.local
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js  ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.env.local  ./

USER nextjs

EXPOSE 3000

CMD [ "npm", "start" ]
