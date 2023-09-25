import { AuthApi, Configuration, ResponseError } from '@cuculus/cuculus-api';
import jwtDecode, { JwtPayload } from 'jwt-decode';

const accessToken = {
  set: (token: string) => localStorage.setItem('accessToken', token),
  get: () => localStorage.getItem('accessToken') ?? '',
  delete: () => localStorage.removeItem('accessToken'),
};

const authApi = new AuthApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_CUCULUS_API_URL,
  }),
);

export class AuthMiddleware {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  /**
   * ログイン処理
   * @param username
   * @param password
   */
  public fetchSignIn = async (username: string, password: string) => {
    try {
      const response = await authApi.postSignIn(
        {
          loginRequest: {
            username,
            password,
          },
        },
        { credentials: 'include' },
      );
      accessToken.set(response.accessToken);
    } catch (error) {
      throw error;
    }
  };

  /**
   * アクセストークン自動更新
   * @param name
   */
  public fetchAccessToken = async (name?: string): Promise<string> => {
    // bearerのみサポート
    if (name !== 'bearer') {
      return Promise.resolve('');
    }

    // 更新中だった場合は待機させる
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }
    const token = accessToken.get();
    try {
      const payload = jwtDecode<JwtPayload>(token);
      if (payload.exp) {
        const now = new Date().getTime() / 1000;
        // 期限に60分以上余裕がある場合はそのまま返す
        if (now + 60 * 60 <= payload.exp) {
          return Promise.resolve(token);
        }
      }
    } catch (error) {
      // 壊れているので一旦削除し、後述の処理で修復を試みる
      accessToken.delete();
    }
    // 期限切れが60分に迫っていた、またはJWTが破損している場合更新対象とする
    this.isRefreshing = true;
    try {
      const newToken = await authApi.postTokenRefresh({
        credentials: 'include',
      });
      accessToken.set(newToken.accessToken);
    } catch (error) {
      if (error instanceof ResponseError) {
        // 401の場合はログアウトとする。それ以外はオフライン状態なので放置
        if (error.response.status === 401) {
          accessToken.delete();
        }
      }
    } finally {
      this.isRefreshing = false;
      this.refreshSubscribers.forEach((callback) =>
        callback(accessToken.get()),
      );
      this.refreshSubscribers = [];
    }
    return Promise.resolve(accessToken.get());
  };
}
