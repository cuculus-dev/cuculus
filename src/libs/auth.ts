import { ResponseError } from '@cuculus/cuculus-api';
import { authApi } from '@/libs/cuculus-client';
import { jwtDecode } from 'jwt-decode';

const CACHE: Record<number, [string, AuthJwtPayload]> = {};
const PROCESS: Record<number, Promise<string | undefined>> = {};

export interface AuthJwtPayload {
  id: number;
  exp: number;
  iat: number;
}

function setAccessToken(accessToken: string): [string, AuthJwtPayload] {
  const payload = decodeToAuthJwtPayload(accessToken);
  CACHE[payload.id] = [accessToken, payload];
  return [accessToken, payload];
}

export async function getAccessToken(
  userId: number,
): Promise<string | undefined> {
  // 実行中のfetchがないか確認
  if (!(userId in PROCESS)) {
    PROCESS[userId] = fetchAccessToken(userId);
  }
  const result = await PROCESS[userId];
  delete PROCESS[userId];
  return result;
}

export async function fetchAccessToken(
  userId?: number,
): Promise<string | undefined> {
  // cacheを確認
  if (userId && userId in CACHE) {
    const [token, payload] = CACHE[userId];
    const now = new Date().getTime() / 1000;
    // 期限に5分以上余裕がある場合はそのまま返す
    if (now + 60 * 5 <= payload.exp) {
      return token;
    } else {
      delete CACHE[userId];
    }
  }
  // キャッシュがない場合は取得を試みる
  try {
    const newToken = await authApi.postTokenRefresh({
      credentials: 'include',
    });
    // 違うユーザーの可能性はある
    const [accessToken, payload] = setAccessToken(newToken.accessToken);
    // 同じユーザーだった場合はそのまま返却する
    if (userId === undefined || payload.id === userId) {
      return accessToken;
    }
  } catch (error) {
    if (error instanceof ResponseError) {
      if (error.response.status === 401) {
        console.error('アクセストークンの更新に失敗しました。');
      }
    }
  }
  return undefined;
}

/**
 * TokenをAUthJwtPayloadにデコード
 * @param token
 */
export function decodeToAuthJwtPayload(token: string): AuthJwtPayload {
  try {
    return jwtDecode<AuthJwtPayload>(token);
  } catch (error) {
    throw error;
  }
}

/**
 * ログイン処理
 * @param username
 * @param password
 * @throws Error
 */
export async function signIn(
  username: string,
  password: string,
): Promise<AuthJwtPayload> {
  const response = await authApi.postSignIn(
    {
      loginRequest: {
        username,
        password,
      },
    },
    { credentials: 'include' },
  );
  return setAccessToken(response.accessToken)[1];
}

/**
 * アカウント登録処理
 * @param username
 * @param password
 * @param code
 * @param email
 * @param invitationCode
 * @throws Error
 */
export async function signUp(
  username: string,
  password: string,
  code: string,
  email: string,
  invitationCode?: string,
): Promise<AuthJwtPayload> {
  const response = await authApi.postSignUp(
    {
      userRequest: {
        username,
        password,
        code,
        email,
        invitationCode,
      },
    },
    { credentials: 'include' },
  );
  return setAccessToken(response.accessToken)[1];
}

export async function signOut() {
  await authApi.postSignOut({ credentials: 'include' });
  Object.keys(CACHE).forEach((key) => {
    delete CACHE[+key];
  });
}

export async function getAuthorizationHeader(
  userId?: number,
): Promise<HeadersInit> {
  if (userId) {
    const token = await getAccessToken(userId);
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return {};
}
