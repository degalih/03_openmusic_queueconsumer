const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic Apps',
      to: targetEmail,
      subject: 'Ekspor Lagu Playlist',
      text: 'Terlampir hasil dari Lagu dalam Playlist',
      attachments: [
        {
          filename: 'PlaylistSongs.json',
          content,
        },
      ],
    };

    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
