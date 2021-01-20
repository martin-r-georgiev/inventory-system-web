# Using the official Node docker image
FROM node:13.12.0-alpine

# Setting working directory
WORKDIR /app

# Adding `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Installation of app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Adding application
COPY . ./

# Starting application
CMD ["npm", "start"]
