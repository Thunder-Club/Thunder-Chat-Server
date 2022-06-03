import 'dotenv/config';
import app from './app';
import { createServer } from 'http';

const PORT: number = Number(process.env.PORT) || 3000;

const server = createServer(app);
const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://thunder-chat-server.onrender.com/';

server.listen(PORT, () => {
  console.log(`🚀 server running on ${url}`);
});

export default server;
