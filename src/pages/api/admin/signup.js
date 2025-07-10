// pages/api/admin/signup.js

import connectMongo from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  await connectMongo();

  const existing = await Admin.findOne({ username });
  if (existing) return res.status(400).json({ error: 'Admin already exists' });

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.create({ username, password: hashed });

  res.status(201).json({ message: 'Admin created', admin: { username: admin.username } });
}
