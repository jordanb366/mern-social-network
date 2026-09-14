FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy ALL files first so your scripts can find the 'server' and 'client' folders
COPY . .

# 2. Run npm install (the script will now successfully cd into both directories)
RUN npm install --no-audit --no-fund

# 3. Build the frontend (if you are compiling React on this server)
# Uncomment the line below if your project requires a build step for the frontend:
# RUN cd client && npm run build

# 4. Expose your backend API port
EXPOSE 5000

# 5. Start the application
CMD ["npm", "start"]
