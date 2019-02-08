FROM node:alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app/
COPY .env /usr/app/
RUN npm install
COPY . /usr/app
EXPOSE 4000

CMD ["npm", "start"]