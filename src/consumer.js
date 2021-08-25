require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService = require('./PlaylistsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const playlistsongs = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsongs, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistsongs', {
    durable: true,
  });

  channel.consume('export:playlistsongs', listener.listen, {
    noAck: true,
  });

  console.log(`Program Queue Consumer sedang berjalan...`);
};

init();
