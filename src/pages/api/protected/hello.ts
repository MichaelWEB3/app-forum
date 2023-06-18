
import type { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../../middleware/authMiddleware';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: `Hello, user` });
}

export default authMiddleware(handler);
