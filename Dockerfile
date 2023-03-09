FROM node:19

WORKDIR /contacto

COPY . .

RUN npm install

RUN npm run build

CMD npm run start
