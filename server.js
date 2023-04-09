const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

let api;

function getApi() {
  return new Promise(async (resolve, reject) => {
    // To use ESM in CommonJS, you can use a dynamic import like this:
    const { ChatGPTAPI } = await import('chatgpt')
    // You can also try dynamic importing like this:
    // const importDynamic = new Function('modulePath', 'return import(modulePath)')
    // const { ChatGPTAPI } = await importDynamic('chatgpt')
    const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })
    return resolve(api)
  })
}
getApi().then(res => {
  api = res
  console.log("ChanGpt初始化成功")
})
app.use(async ctx => {
  const res = await api.sendMessage(ctx.request.body.text)
  ctx.body = res.text;
});
app.listen(process.env.PORT);
