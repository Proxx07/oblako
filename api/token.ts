import type { VercelRequest, VercelResponse } from '@vercel/node';
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import tokenHandler from '../server/tokenHandler';

export default (req: VercelRequest, res: VercelResponse) => {
  return tokenHandler(req, res);
};
