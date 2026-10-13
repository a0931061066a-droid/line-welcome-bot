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
              text: `♥歡迎各位的加入♥

🔜2⃣️4⃣️小時不打烊🔙

採群組叫車，安全無疑慮👌

📥直接打上上車地點即可
會有專人小夥伴服務您🫶

✅可預約/✅可即時

💳費率約是小黃的8折
遠程可先估價，提早預約享折扣🎉

🪧溫馨提醒🪧
🔔入群可先關閉群組通知，避免群組訊息打擾到您
🔔若對乘車過程中有任何疑慮（如跳錶有誤、司機私下與您加聯絡訊息、司機途中違規⋯）
請立即通知我們🙇🏻‍♀️

🪧計費方式🪧
使用「METER APP」計費
起跳費 $80
每分鐘 $2
每公里 $18
低消💰$100
超過15公里，每公里多$5

‼️抵達後取消會產生$100空趟
務必叫車後要搭車😌謝謝🙏

🪧付款方式🪧
▪️現金
▫️轉帳
▪️街口
（🈚️刷卡、🈚️line pay）

💛🧡🆃🅷🅰🅽🅺 🆈🅾🆄🧡💛`,
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
