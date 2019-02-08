# Bazaar Bot

Telegram Bot for facilitating local community markets.

## Usage
Rename the `.env.sample` file to `.env` and edit it with needed configurations.

```
docker run -d --name bazaar-bot \
   -v ~/ssb-data/:/home/node/.ssb/ \
   -p 4000:4000 \
   --restart unless-stopped \
   communityfirst/bazaar-bot
```

## Developing
`npm i` and `npm start`. You'll need a [open-app-graphql-server]() running with the [bazaar-graphql]() plugin.