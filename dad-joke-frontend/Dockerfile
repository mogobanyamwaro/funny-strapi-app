# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run Stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package*.json ./
RUN npm install --omit=dev  # Install only production dependencies

# Expose port 3000
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]