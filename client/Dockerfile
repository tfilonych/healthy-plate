FROM node:20-alpine

WORKDIR /app
COPY package*.json .
RUN npm install react-scripts -g
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./build ./build

EXPOSE 5000

CMD ["npm", "start"]
# CMD ["tail", "-f", "/dev/null"]
