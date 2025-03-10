import { Injectable } from '@nestjs/common';
import { Song } from './types';

@Injectable()
export class SongsService {
  // local db
  // local array

  private readonly songs: Song[] = [];

  create(song: Song): Song[] {
    this.songs.push(song);
    return this.songs;
  }

  findAll(): Song[] {
    return this.songs;
  }

  findOne() {}

  update() {}

  delete() {}

}
