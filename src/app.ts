import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import 'dotenv/config';
import 'reflect-metadata';
import { mysqlConnect } from './configs';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import { globalRouter } from './routes';

class App {
  public app = new Koa();

  private middleware() {
    this.app.use(errorHandlerMiddleware);
    this.app.use(bodyParser());
    this.app.use(logger());
  }

  constructor() {
    this.middleware();
    mysqlConnect.initialize().then(() => {
      console.log('mysql running.');
    });
    this.app.use(globalRouter.middleware());
  }
}

export default App;
