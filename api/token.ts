import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (_: VercelRequest, res: VercelResponse) => {
  try {
    // eslint-disable-next-line node/prefer-global/process
    const response = await fetch(`${process.env.VITE_API_URL}/api/Identity/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line node/prefer-global/process
      body: JSON.stringify({ login: process.env.VITE_API_LOGIN, password: process.env.VITE_API_LOGIN }),
    });
    const result = await response.json() as { accessToken: string };
    if (result.accessToken) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Set-Cookie', [`token=${result.accessToken}; Path=/; SameSite=Strict; Secure`]);
    }
    (res as any).statusCode = result.accessToken ? 200 : 500;
    res.end(JSON.stringify({ success: Boolean(result.accessToken) }));
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    (res as any).statusCode = 500;
    res.end(JSON.stringify({ success: false }));
  }
};
