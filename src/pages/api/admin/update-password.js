import dbConnect from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  console.log('Request received:', req.method, req.body);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { adminId, currentPassword, newPassword } = req.body;

  if (!adminId || !currentPassword || !newPassword) {
    console.log('Missing fields', { adminId, currentPassword, newPassword });
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Connecting to DB...');
    await dbConnect();
    console.log('DB connected');

    console.log('Finding admin with ID:', adminId);
    const admin = await Admin.findById(adminId);
    if (!admin) {
      console.log('Admin not found');
      return res.status(404).json({ message: 'Admin not found' });
    }

    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      console.log('Current password mismatch');
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    console.log('Hashing new password...');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    
    console.log('Saving admin...');
    await admin.save();
    console.log('Admin saved successfully');

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Full error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}