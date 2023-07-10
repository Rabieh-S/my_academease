FROM node:18.12
WORKDIR /src
COPY package*.json ./
COPY ./db /src/db
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:dev"]