import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local db
  // local array

  private readonly songs: string[] = [];

  create(song: string): string[] {
    this.songs.push(song);
    return this.songs;
  }

  findAll(): string[] {
    return this.songs;
  }

  findOne() {}

  update() {}

  delete() {}

}
