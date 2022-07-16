import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import 'dotenv/config';
import 'reflect-metadata';
import { mysqlConnect } from './configs';

class App {
  public app = new Koa();

  private middleware() {
    this.app.use(logger());
    this.app.use(bodyParser());
  }

  constructor() {
    mysqlConnect.initialize().then(() => {
      console.log('mysql running.');
    });
    this.middleware();
  }
}

export default App;
