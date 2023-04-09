const Koa = require('koa');
const proxy = require('koa2-proxy-middleware');
const bodyparser = require('koa-bodyparser');

const app = new Koa();

const options = {
  targets: {
    '/(.*)': {
      // this is option of http-proxy-middleware
      target: 'https://api.openai.com', // target host
      changeOrigin: true, // needed for virtual hosted sites
    }
  }
}

app.use(proxy(options));


app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.listen(process.env.PORT || 3000)