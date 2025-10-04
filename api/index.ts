import type { VercelRequest, VercelResponse } from '@vercel/node';
import tokenHandler from '../server/tokenHandler';

export default (req: VercelRequest, res: VercelResponse) => {
  return tokenHandler(req, res);
};
