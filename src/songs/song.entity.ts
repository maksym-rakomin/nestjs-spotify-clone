// import { Playlist } from '../playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  /**
   * Many songs can belong to the playlist for each unique user
   */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playList: Playlist;
}
