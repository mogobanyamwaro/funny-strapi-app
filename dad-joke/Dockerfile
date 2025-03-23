# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Ensure clean install (avoid esbuild version mismatches)
RUN npm ci  

# Copy the rest of the Strapi project
COPY . .

# Force esbuild to match the required version
RUN npm rebuild esbuild  

# Build the Strapi admin panel
RUN npm run build

# Run Stage
FROM node:20-alpine
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app /app

# Expose the default Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
