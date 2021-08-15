const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistSongs(playlistId, credentialId) {
    const query = {
      text: `SELECT playlists.id, songs.title , songs.performer
                FROM playlistsongs
                LEFT JOIN songs ON songs.id = playlistsongs.song_id
                LEFT JOIN playlists ON playlists.id = playlistsongs.playlist_id
                LEFT JOIN users ON users.id = playlists.owner
                LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
                WHERE playlists.id = $1
                AND playlists.owner = $2 OR collaborations.user_id = $2
                GROUP BY playlists.id, songs.title, songs.performer`,
      values: [playlistId, credentialId],
    };
    const result = await this.pool.query(query);
    return result.row;
  }
}

module.exports = PlaylistSongsService;
