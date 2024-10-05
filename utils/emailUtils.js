// utils/emailUtils.js
import emailjs from 'emailjs-com';

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const sendEmail = async ({ name, email, message }) => {
  const templateParams = {
    from_name: name,
    to_name: 'Recipient Name', // Change this to your recipient's name or a variable if needed
    reply_to: email,
    message: message,
  };

  try {
    if (!publicKey) {
      throw new Error('Public key is not defined');
    }

    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    return response;
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
