// // pages/api/products/[id].js
// import connectMongo from '../../../../lib/mongodb';
// import Product from '../../../../models/Products';

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === 'PUT') {
//     // Handle update request
//     try {
//       await connectMongo();
//       const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//         new: true, // Return the updated product
//         runValidators: true, // Run validators to ensure valid data
//       });

//       if (!updatedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }

//       res.status(200).json(updatedProduct);
//     } catch (error) {
//       console.error('Error updating product:', error);
//       res.status(500).json({ error: 'Failed to update product' });
//     }
//   } else if (req.method === 'DELETE') {
//     // Handle delete request
//     try {
//       await connectMongo();
//       const deletedProduct = await Product.findByIdAndDelete(id);

//       if (!deletedProduct) {
//         return res.status(404).json({ error: 'Product not found' });
//       }

//       res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       res.status(500).json({ error: 'Failed to delete product' });
//     }
//   } else {
//     // Method not allowed
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }





import connectMongo from '../../../../lib/mongodb';
import Product from '../../../../models/Products';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Handle GET request
    try {
      await connectMongo();
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  } else if (req.method === 'PUT') {
    try {
      await connectMongo();
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await connectMongo();
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

