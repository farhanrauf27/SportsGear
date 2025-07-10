// pages/api/admin/logout.js

import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the exact same cookie name used in login: 'admin-token'
    res.setHeader('Set-Cookie', serialize('admin-token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'strict',
      secure: false, // leave this false for localhost
    }));

    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
