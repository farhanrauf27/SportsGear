export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const userCount = await User.countDocuments();
      res.status(200).json({ count: userCount });
    } catch (err) {
      console.error('Error counting users:', err);
      res.status(500).json({ message: 'Error counting users' });
    }
  }