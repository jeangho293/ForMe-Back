import Router from 'koa-joi-router';
import { publicSignupRoutes } from './signup';

export const publicUserRoutes = Router();
publicUserRoutes.route([...publicSignupRoutes]);
