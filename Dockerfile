FROM node:19-alpine
WORKDIR /app

COPY package*.json .

RUN npm install -g nodemon
RUN npm install react-scripts -g
RUN npm install -g concurrently
RUN npm install -g sass
RUN npm cache clean --force
RUN npm install

COPY ./client ./client
COPY ./config ./config
COPY ./images ./images
COPY ./render ./render
COPY ./server ./server
COPY ./bootstrap.js .
COPY ./bootstrappedFiles.js .
COPY ./index.js .
COPY ./webpack.config.js .
EXPOSE 3009

#RUN sass ./client/src/styles/index.scss ./client/public/index.css

# Compile SCSS to CSS
#RUN npm run compile-sass
# Copy the compiled CSS files to the ./client/ directory
#RUN cp -r ./client/public/. ./client/
CMD ["npm", "run", "dev"]