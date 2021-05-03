FROM node:alpine
WORKDIR /src/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000/udp
EXPOSE 5000
CMD npm start