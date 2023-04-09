var Koa = require('koa');
var proxy = require('koa-http2-proxy');
var app = new Koa();

app.use(proxy({ target: 'https://api.openai.com/v1' }));

app.listen(process.env.PORT);