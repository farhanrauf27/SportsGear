// /api/contact.js or routes/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
        
      });
      
      const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `Thank you for contacting SportsGear, ${name}`,
        html: `
          <div class="bg-gray-50 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
  <h3 class="text-2xl font-semibold text-gray-800 mb-4">Hey Sportgear,</h3>
  
  <p class="text-lg text-gray-700 mb-4">The user <span class="font-bold text-indigo-600">${name}</span> with the email <span class="text-indigo-500">${email}</span> wants to contact you. Here is their message:</p>
  
  <blockquote class="bg-gray-100 border-l-4 border-indigo-600 text-gray-800 p-4 mb-6 rounded-lg italic">
    "${message}"
  </blockquote>

  <p class="text-lg text-gray-700">We’ll get back to them soon!</p>
  
  <div class="mt-6 pt-4 border-t border-gray-200 text-center">
    <p class="text-sm text-gray-500">This message was sent from your contact form.</p>
  </div>
</div>

        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email sending error:", error);
      return res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
