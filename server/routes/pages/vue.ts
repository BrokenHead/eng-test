import { Handler, Response, Request } from 'server/types/routes';
import appRoot from 'app-root-path';

const get: Handler = (req: Request, res: Response): void => {
  res.sendFile(`${appRoot}/dist/client/index.html`);
};

export default {
  get
};
