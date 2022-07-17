import Router from 'koa-joi-router';
import { publicUserRoutes } from './users';

export const globalRouter = Router();

globalRouter.use(publicUserRoutes.middleware());
