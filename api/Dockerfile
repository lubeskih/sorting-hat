# Create image based on the official Node 6 image from the dockerhub
FROM node:16

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependencies
RUN npm install --legacy-peer-deps

# Get all the code needed to run the app
COPY . /usr/src/app

# generate and migrate prisma
RUN yarn prisma:generate
RUN yarn prisma:migrate

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]