class Listener {
  constructor(PlaylistsService, mailSender) {
    this.PlaylistsService = PlaylistsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlistsongs = await this.PlaylistsService.getSongsFromPlaylist(
        playlistId
      );
      const result = await this.mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistsongs)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
