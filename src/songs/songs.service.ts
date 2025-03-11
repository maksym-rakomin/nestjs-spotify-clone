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
    // Errors comes while fetching the data form DB
    // throw new Error('Error form DB');
    return this.songs;
  }

  findOne() {}

  update() {}

  delete() {}

}
