const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const cors = require('cors')
const token = '5831327419:AAE9RZOgZ6-kKwuYMS9U-PxeguMqwNoalt0'
//const webAppUrl = 'https://ya.ru'
//const webAppUrl = 'https://master--cool-liger-9df88b.netlify.app/'
const webAppUrl = 'https://tk8fjbs5-3000.euw.devtunnels.ms/checks'
//const webAppUrl = 'https://front-end-nu-opal.vercel.app/'

// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, { polling: true });
const app = express()
app.use(express.json())
//app.use(cors())

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text

  if (text === '/start') {
    bot.sendMessage(chatId, 'Ниже появится кнопка заполни форму', {
      reply_markup: {
        keyboard: [
          [{ text: 'Сделать заказ', web_app: { url: webAppUrl + '/#/form' } }]
        ]
      }
    });

    bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Магазин', web_app: { url: webAppUrl + '/#/' } }]
        ]
      }
    });
  }
  // send a message to the chat acknowledging receipt of their message

});


app.post('/web-data', async (req, res) => {
  console.log('OK')
  const { queryId, products, totalPrice } = req.body
  res.send("<h2>web-data</h2>")
  //try {
  // await bot.answerWebAppQuery(queryId, {
  //   type: 'article',
  //   id: queryId,
  //   title: 'Успешная покупка',
  //   input_message_content: {
  //     message_text:'Поздравляю с успешной покупкой, вы приобрели товар на сумму '+totalPrice
  //   }
  // })
  //  return res.status(200).send(json({}))
  //}
  //catch(e) {
  // await bot.answerWebAppQuery(queryId, {
  //   type: 'article',
  //   id: queryId,
  //   title: 'Не удалось приобрести товар',
  //   input_message_content: {
  //     message_text: 'Не удалось приобрести товар'
  //   }
  // })
  //  return res.status(500).send(json({}))
  //}
})

// app.post('/web-data1', async (req, res) => {

//   //res.text = 'КУЫЗЩТЫУ'
//   console.log('BOT')
//   res.send("<h2>Я БОТ</h2>")
//   //return // res.status(200).send(res.text)
// })

const PORT = 8000
app.listen(PORT, () => {
  console.log('Server is started on PORT ' + PORT)
})