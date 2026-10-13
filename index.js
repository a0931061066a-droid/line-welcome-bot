const express = require('express');
const { middleware, messagingApi } = require('@line/bot-sdk');

const app = express();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

app.get('/', (req, res) => {
  res.send('LINE Welcome Bot is running!');
});

app.post('/webhook', middleware(config), async (req, res) => {
  try {
    for (const event of req.body.events) {
      if (
        event.type === 'memberJoined' &&
        event.source.type === 'group'
      ) {
        await client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: 'text',
              text:
                '❤️ 歡迎加入本群組 ❤️\n\n' +
                '🚖 24 小時叫車服務，隨時為您服務！\n\n' +
                '📍 請直接在群組輸入您的上車地點，' +
                '將由專人為您安排車輛。\n\n' +
                '🙏 感謝您的加入，祝您一路順風！',
            },
          ],
        });
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Bot listening on port ${port}`);
});
