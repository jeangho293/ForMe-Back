import * as Koa from 'koa';
import { isBoom } from 'boom';

interface ResponseError {
  errorMessage?: string;
}

interface TransformResponse {
  status: number;
  body: ResponseError;
}

const transformResponse = (err: Error): TransformResponse => {
  const response: TransformResponse = {
    status: 500,
    body: {
      errorMessage: '',
    },
  };

  if (isBoom(err)) {
    const { statusCode } = err.output;
    const { errorMessage } = err.data ?? ({} as any);
    response.status = statusCode;
    response.body = {
      errorMessage: errorMessage ?? `Something went wrong and we couldn't complete your request.`,
    };
  } else {
    response.status = 500;
    response.body = {
      errorMessage: 'An unexpected error has occurred. Please try again.',
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error handler]', err.message);
  }

  return response;
};

export const errorHandlerMiddleware = async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    const response = transformResponse(err as any);
    ctx.status = response.status;
    const { errorMessage } = response.body;
    ctx.body = {
      errorMessage: errorMessage ?? 'An unexpected error has occurred. Please try again.',
    };
  }
};
