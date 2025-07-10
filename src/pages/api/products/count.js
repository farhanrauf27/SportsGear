import connectMongo from '../../../../lib/mongodb';
import Product from '../../../../models/Products';

export default async function handler(req, res) {
  await connectMongo();

  try {
    const count = await Product.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting products:', error);
    res.status(500).json({ error: 'Failed to count products' });
  }
}