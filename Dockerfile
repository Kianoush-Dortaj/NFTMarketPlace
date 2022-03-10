FROM node:latest
WORKDIR /
COPY package.json .
COPY package-lock.json* .
RUN npm cache clean --force 
RUN npm install
COPY . .
EXPOSE 1248
CMD ["npm","start"]