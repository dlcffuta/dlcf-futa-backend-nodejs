# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /myapp

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle your source code into the container
COPY . .

# Expose the API's port
EXPOSE 4001

# Run the app when the container launches
RUN yarn run build

# Define the command to run your application
CMD ["node", "./dist/index.js"]
