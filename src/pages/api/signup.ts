import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect("");
};

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
});

// Fix: Declare User model only once
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { firstName, lastName, phoneNumber, email, password, country } = req.body;

    console.log('Received data:', req.body); // Log incoming data to ensure it's correct

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        country
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with success
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during user creation:', error); // Log the full error
      res.status(400).json({ error: error.message || 'User creation failed' }); // Send the error message back
    }
  } else {
    res.status(405).json({ error: 'Only POST method allowed' });
  }
}

