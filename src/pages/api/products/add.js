// pages/api/products/add.js

import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Products';

import { IncomingForm } from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing the form' });
    }

    try {
      // Convert array fields to string values
      const parsedFields = {};
      for (const key in fields) {
        parsedFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      }

      const { name, brand, category, subcategory, price } = parsedFields;

      // Get uploaded file name
      const pictureFile = files.picture;
      if (!pictureFile) {
        return res.status(400).json({ error: 'Picture is required' });
      }

      const uploadedFile = Array.isArray(pictureFile) ? pictureFile[0] : pictureFile;
      const picturePath = `/uploads/${uploadedFile.newFilename}`;

      const product = new Product({
        name,
        brand,
        category,
        subcategory,
        price: parseFloat(price),
        picture: picturePath,
      });

      await product.save();
      return res.status(200).json({ message: 'Product added successfully!' });
    } catch (saveError) {
      console.error('Error saving product:', saveError);
      return res.status(400).json({ error: saveError.message });
    }
  });
}
