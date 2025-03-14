// import { Playlist } from '../playlists/playlist.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  /**
   * Many songs can belong to the playlist for each unique user
   */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playList: Playlist;
}
