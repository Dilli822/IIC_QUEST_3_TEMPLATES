# Use Node.js 18 LTS as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Expose the port your backend listens on (change if different)
EXPOSE 8000

# Start the backend server
CMD ["npm", "start"]

