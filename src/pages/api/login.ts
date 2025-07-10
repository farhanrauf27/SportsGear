import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// import connectDB from '../../lib/db';
// import User from '../../models/User';


const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect("mongodb+srv://rehanramzan2001:MYBfCThvfpgyFv6N@cluster0.m76aob3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
};

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        country:user.country,
      };

      res.status(200).json({ token });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json({ message: 'Login successful!' });

    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Only POST method allowed' });
  }
}
