# Bazaar Bot

Telegram Bot for facilitating local community markets.

## Usage
To use the Telegram Bot API, you first have to get a bot account by [chatting with BotFather](https://core.telegram.org/bots#6-botfather).

Create a directory on the docker host for persisting the SSB data:
```
mkdir ~/ssb-bazaar-data
chown -R 1000:1000 ~/ssb-bazaar-data
```
Run the image
```
docker run -d --name bazaar-bot \
  -v ~/ssb-bazaar-data/:/root/.ssb-bazaarbot/ \
  -e BOT_TOKEN="xxx-xxx-xx" \
  -e COMMUNITY_CURRENCY="SHELL" \
  -e FIAT_CURRENCY="Dollars" \
  -e DEFAULT_LOCAL="en" \
  -e SCOPE="COMMUNITY-NAME" \
  -e APP_KEY="secret" \
  -p 4000:4000 \
  --restart unless-stopped \
  communityfirst/bazaar-bot
```
Or Rename the `.env.sample` file to `.env` and edit it with needed configuration.