# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the Vite project
RUN npm run build

# Use a lightweight web server to serve the built files
RUN npm install -g serve

# Expose port Vite uses in development
EXPOSE 4173

# Start the app in production mode
CMD ["serve", "-s", "dist", "-l", "4173"]
