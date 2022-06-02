import app from './app';
import { createServer } from 'http';

const PORT: number = Number(process.env.PORT) || 3000;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`);
});

export default server;
