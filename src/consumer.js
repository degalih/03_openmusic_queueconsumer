require('dotenv').config();
const amqp = require('amqplib');
const PlaylistSongsService = require('./PlaylistSongsService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const playlistsongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsongsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:PlaylistSongs', {
    durable: true,
  });

  channel.consume('export:PlaylistSongs', listener.listen, {
    noAck: true,
  });
};

init();
