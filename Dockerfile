# ---------- Stage 1: Build Client ----------
FROM node:20-alpine AS client-build
WORKDIR /client

# Copy only client package files first (better caching)
COPY client/package*.json ./

# Install client dependencies
RUN npm install --no-audit --no-fund --prefer-offline --loglevel error

# Copy client source
COPY client/ .

# Build client
RUN npm run build


# ---------- Stage 2: Build Server ----------
FROM node:20-alpine AS server-build
WORKDIR /server

# Copy only server package files first
COPY server/package*.json ./

# Install server dependencies
RUN npm install --no-audit --no-fund --prefer-offline --loglevel error

# Copy server source
COPY server/ .

# Copy CRA build output into the expected server path

COPY --from=client-build /client/build ./client/build




# ---------- Stage 3: Production Image ----------
FROM node:20-alpine
WORKDIR /app

# Copy server build output
COPY --from=server-build /server .

# Environment
ENV NODE_ENV=production
ENV PORT=3001
ENV NODE_OPTIONS="--max-old-space-size=1024"

EXPOSE 3001

CMD ["node", "server.js"]
