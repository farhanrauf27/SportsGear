// pages/api/products/index.js
import connectMongo from '../../../../lib/mongodb';
import Product from '../../../../models/Products';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectMongo();
      const products = await Product.find(); // Fetch all products
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
