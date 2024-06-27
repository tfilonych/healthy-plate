import nodemailer from 'nodemailer';
import config from 'config';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get('smtpHost'),
      port: config.get('smtpPort'),
      secure: false,
      auth: {
        user: config.get('smtpUser'),
        pass: config.get('smtpUserPassword')
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: config.get('smtpUser'),
      to,
      subject: 'Активацiя акаунта на ' + config.get('apiURL'),
      text: '',
      html:
        `
          <div>
            <h1>Для активації перейдіть по лінці</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    });
  }
}

export default new MailService();