import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  hostUrl: process.env.HOST_URL,
}));