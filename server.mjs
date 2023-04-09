import { createServer } from 'http';

createServer((req, res) => {
  res.write("你好");
  res.end();
}).listen(process.env.PORT);
