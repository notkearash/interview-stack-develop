# pull official base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /api.products

# add `/api.products/node_modules/.bin` to $PATH
ENV PATH /api.products/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --no-package-lock --no-audit

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the server port
EXPOSE 8004

# Set the startup command for the container
CMD ["npm", "start"]
