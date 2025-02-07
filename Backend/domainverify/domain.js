const axios = require("axios");

async function verifyEmail(email) {
  const apiKey = "5fd0522f078f275cb3d68b26c3449b11"; // Replace with your actual API key
  const url = `http://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

        return data.format_valid && data.mx_found && data.smtp_check; // ✅ Returns true if email exists
  } catch (error) {
    console.error("Error verifying email:", error.message);
    return false;
  }
}
module.exports = verifyEmail;
