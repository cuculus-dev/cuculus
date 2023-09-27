import { AuthApi, Configuration, UsersApi } from '@cuculus/cuculus-api';
import { AuthMiddleware } from '@/api/auth-middleware';

const authMiddleware = new AuthMiddleware();

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_CUCULUS_API_URL,
  accessToken: authMiddleware.fetchAccessToken,
});

const authApi = new AuthApi(config);
const usersApi = new UsersApi(config);

export { authMiddleware, authApi, usersApi };
