import { ApiErrorCode } from 'shared/types/api';
import { User } from 'shared/types/models';
import { Response } from 'server/types/routes';
import config from 'server/config';
import logger from 'server/services/logger';
import { cache } from 'server/services/cache';

// NOTE: Extra credit for fixing the security issue in this file.

export interface AuthTokens {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
}

interface SignInOptions {
  email: string;
  password: string;
}

interface SignInSuccess {
  tokens: AuthTokens;
  user: User;
}

interface UpdateCookiesOptions {
  res: Response;
  tokens: AuthTokens | null;
}

interface VerifyOptions {
  tokens: AuthTokens;
}

interface VerifySuccess {
  tokens: AuthTokens;
  user: User;
}

async function signIn({ email, password }: SignInOptions): Promise<void> {
  logger.info('Signing user in with the following credentials:', {
    email,
    password
  });

  // @TODO: Implement sign on functionality. You may generate or use any string for the `AuthTokens`.
  // HINT: The cache service is used as our "database". See unused import.
  // HINT: Passwords are stored as md5 hashes.
}

function updateCookies({ res, tokens }: UpdateCookiesOptions): void {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });
  } else {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}

async function verify({ tokens }: VerifyOptions): Promise<VerifySuccess> {
  try {
    // @TODO: Implement token validation.
    throw new Error(ApiErrorCode.INVALID_AUTH);
  } catch (error) {
    throw error;
  }
}

export default { signIn, updateCookies, verify };
