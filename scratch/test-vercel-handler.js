import dotenv from 'dotenv';
import handler from '../api/contact.js';

dotenv.config();

async function testVercelHandler() {
  const req = {
    method: 'POST',
    body: {
      name: 'Real User Test',
      email: 'divyanshsingh74178@gmail.com',
      message: 'Testing message submission via Vercel serverless api/contact.js route!'
    }
  };

  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log(`Response [${this.statusCode}]:`, JSON.stringify(data, null, 2));
      return this;
    }
  };

  console.log('Testing api/contact.js handler...');
  await handler(req, res);
}

testVercelHandler();
