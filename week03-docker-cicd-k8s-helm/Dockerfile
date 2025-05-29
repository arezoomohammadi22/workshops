FROM docker.arvancloud.ir/node:14

WORKDIR /app

COPY apps/package*.json ./
RUN npm install

COPY apps/ .

EXPOSE 8080

CMD ["npm", "start"]
