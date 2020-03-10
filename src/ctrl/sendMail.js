import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import 'regenerator-runtime/runtime';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Creates an instance of sendMail.
 *
 * @constructor
 * @param {string} data.receiver The email of the receiver.
 * @param {string} data.subject The subject of the sender's message.
 * @param {string} data.message The message from sender.
*/

const sendEmail = async (data) => {
  try {
    const {
      receiver,
      subject,
      message,
    } = data;
    const msg = {
      to: receiver,
      from: 'noreply@codefoodie.com',
      subject,
      html: `${message}`,
    };
    const result = await sgMail.send(msg);
    if (result[0] && result[0].request) {
      return { success: true, message: 'Email sent successfully' };
    }
  } catch (error) {
    return { success: false, message: 'incomplete Task' };
  }
  return false;
};

const sendmailCallBack = async (req, res) => {
  const result = await sendEmail(req.body);
  if (result.success) {
    return res.status(201).send({
      status: 201,
      suceess: true,
      message: 'Email sent successfully',
    });
  }
  return res.status(500).send({
    status: 500,
    suceess: false,
    error: 'Incomplete task, please try again',
  });
};

export default { sendEmail, sendmailCallBack };
