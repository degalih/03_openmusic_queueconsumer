class Listener {
  constructor(PlaylistSongsService, mailSender) {
    this.PlaylistSongsService = PlaylistSongsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, credentialId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const PlaylistSongsService =
        await this.PlaylistSongsService.getPlaylistSongs(
          playlistId,
          credentialId
        );
      const result = await this.mailSender.sendEmail(
        targetEmail,
        JSON.stringify(PlaylistSongsService)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
