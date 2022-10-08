#Importing Base Image
FROM node:alpine

# settig up enviroment variable
ENV NODE_OPTIONS=--openssl-legacy-provider

#Working Directory
WORKDIR /currency_converter


COPY package.json .

#Installing npm
RUN npm install --silent

#Copying all other files
COPY . .

EXPOSE 5000

#Execution
CMD ["npm", "start"]
