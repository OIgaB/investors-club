# Use a Node.js base image
FROM node:20.11.1

# Set the working directory
WORKDIR /backend

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
# CMD yarn back
