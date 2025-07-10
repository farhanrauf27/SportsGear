// lib/auth.js

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function verifyAdmin(req) {
  const token = req.cookies['admin-token'];
  if (!token) throw new Error('Not authenticated');

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Invalid token');
  }
}
