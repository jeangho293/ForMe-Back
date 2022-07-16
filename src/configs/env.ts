import 'dotenv/config';

// server
export const { SERVER_PORT } = process.env;

// database
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);
export const { DATABASE_NAME } = process.env;
export const { DATABASE_USERNAME } = process.env;
export const { DATABASE_PASSWORD } = process.env;
export const { DATABASE_HOST } = process.env;
