// pages/api/admin/protected.js

import { verifyAdmin } from '../../../../lib/auth';

export default async function handler(req, res) {
  try {
    const admin = verifyAdmin(req);
    res.status(200).json({ admin });
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
