import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IncomingMessage, ServerResponse } from 'node:http';
import fetch from 'node-fetch';

const handler = async (req: IncomingMessage | VercelRequest, res: ServerResponse | VercelResponse) => {
  try {
    // eslint-disable-next-line node/prefer-global/process
    const response = await fetch(`${process.env.API_URL}/api/1/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line node/prefer-global/process
      body: JSON.stringify({ apiLogin: process.env.API_LOGIN }),
    });

    const result = await response.json();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Set-Cookie', [`token=${result.token}; Path=/; SameSite=Strict; Secure`]);

    (res as any).statusCode = 200;
    res.end(JSON.stringify({ success: true }));
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    (res as any).statusCode = 500;
    res.end(JSON.stringify({ success: false }));
  }
};

export default handler;
