FROM node:20-alpine AS builder
WORKDIR /app

# Copy all project files
COPY . .

# 1. Force npm to use less memory globally inside the container
ENV NODE_OPTIONS="--max-old-space-size=1024"

# 2. Split the installations up so they don't run in a single heavy command string
# We also use specific npm flags to minimize memory footprint
RUN cd server && npm install --no-audit --no-fund --prefer-offline --loglevel error

RUN cd client && npm install --no-audit --no-fund --prefer-offline --loglevel error

# 3. Disable React source maps so building the frontend doesn't crash the server later
ENV GENERATE_SOURCEMAP=false
RUN cd client && npm run build

EXPOSE 3001
CMD ["npm", "start"]

