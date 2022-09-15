import {
  ApiErrorCode,
  CurrentUserResponse,
  SignInBody,
  SignInResponse
} from 'shared/types/api';
import { Handler, Response, Request } from 'server/types/routes';
import errorService from 'server/services/errors';
import authService from 'server/services/auth';

const currentUser: Handler = async (req: Request, res: Response<CurrentUserResponse>): Promise<void> => {
  try {
    if (req.currentUser) {
      res.json({
        user: req.currentUser
      });
    } else {
      throw new Error('Current user not found.');
    }
  } catch (err) {
    const error = err as Error;
    errorService.apiErrorHandler({
      error,
      res
    });
  }
};

const signIn: Handler = async (req: Request<SignInBody>, res: Response<SignInResponse>): Promise<void> => {
  // @TODO: Implement the signin route. Don't forget to handle failures!
  // Reminder: this is a cookie-based auth system.
  // Hint: Check out the unused imports.
};

export default {
  currentUser,
  signIn,
};
