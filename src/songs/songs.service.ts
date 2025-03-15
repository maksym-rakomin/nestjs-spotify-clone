import { Injectable, Scope } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song | null> {
    return await this.songRepository.findOneBy({ id });
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songRepository.update(id, recordToUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.songRepository.delete(id);
  }

  async paginate(
    options: IPaginationOptions,
    sortBy: string = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');

    queryBuilder.orderBy(`song.${sortBy}`, order);

    return paginate<Song>(queryBuilder, options);
  }
}
