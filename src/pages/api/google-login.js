import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { credential } = req.body;
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Here you would typically:
    // 1. Check if user exists in your DB
    // 2. Create user if doesn't exist
    // 3. Generate your own JWT token
    
    const userToken = jwt.sign(
      { userId: payload.sub, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token: userToken });
    
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(400).json({ error: 'Invalid Google token' });
  }
}