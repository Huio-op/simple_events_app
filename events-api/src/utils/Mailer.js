const nodemailer = require('nodemailer');
require('dotenv').config();
const readProps = require('./readProps');

class Mailer {
  async send(to, subject, { text, html }, attachments) {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to,
      subject,
      attachments,
      text,
      html,
    });
  }

  async sendUserCreated(userEmail) {
    await this.send(userEmail, readProps('create_user_subj'), {
      html: readProps('create_user_msg'),
    });
  }
}

module.exports = Mailer;
