import * as Joi from 'joi';
import { Spec } from 'koa-joi-router';
import { Container } from 'typedi';
import { UserService } from '../../../services/users/application/service';

const bodySchema = Joi.object({
  name: Joi.string().required().description('사용자 이름'),
  email: Joi.string().required().description('사용자 이메일'),
  password: Joi.string().required().description('비밀번호'),
  checkPassword: Joi.string().required().description('비밀번호 재확인'),
}).required();

export default {
  path: '/users/signup',
  method: 'post',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: { data: Joi.object() },
      },
    },
  },
  handler: async (ctx) => {
    // 1. 서비스 객체 획득
    const userService = Container.get(UserService);

    // 2.서비스 data 획득
    const { name, password, checkPassword, email } = ctx.request.body;

    // 3. 서비스 호출
    const data = await userService.register({ name, password, checkPassword, email });

    // 4. response
    ctx.body = { data };
  },
} as Spec;
