FROM node


WORKDIR /app


COPY package.json /app


RUN npm install
RUN cd .. && chmod -R 777 /app && cd /app

COPY . .

ENV PORT=8080
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait


EXPOSE $PORT

CMD ["npm", "run", "dev"]
