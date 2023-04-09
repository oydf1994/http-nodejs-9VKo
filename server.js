const Koa = require('koa');
const app = new Koa();
let api;
getApi.then(res => {
  api = res
})
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
app.use(async ctx => {
  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
  ctx.body = res.text;
});
app.listen(process.env.PORT);
