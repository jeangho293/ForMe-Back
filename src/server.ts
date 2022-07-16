import App from './app';
import { SERVER_PORT } from './configs/env';

const http = new App().app;

http.listen(SERVER_PORT, () => {
  console.log(`http://localhost:${SERVER_PORT}`);
});
