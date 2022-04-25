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

  async sendUserEdited(userEmail) {
    await this.send(userEmail, readProps('edit_user_subj'), {
      html: readProps('edit_user_msg'),
    });
  }

  async sendUserSubscribed(userEmail, eventName, eventDate) {
    await this.send(userEmail, readProps('subs_event_subj'), {
      html: readProps('subs_event_msg', eventName, eventDate),
    });
  }

  async sendUserUnsubscribed(userEmail, eventName) {
    await this.send(userEmail, readProps('unsubs_event_subj'), {
      html: readProps('unsubs_event_msg', eventName),
    });
  }
}

module.exports = Mailer;
