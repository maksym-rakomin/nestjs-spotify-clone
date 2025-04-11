/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SingUpInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreateSongInput {
    title: string;
    artists: Nullable<number>[];
    releasedDate: string;
    duration: string;
    lyrics?: Nullable<string>;
}

export class UpdateSongInput {
    title?: Nullable<string>;
    artists?: Nullable<Nullable<number>[]>;
    releasedDate?: Nullable<string>;
    duration?: Nullable<string>;
    lyrics?: Nullable<string>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract songs(): Song[] | Promise<Song[]>;

    abstract song(id: string): Song | Promise<Song>;
}

export abstract class IMutation {
    abstract singup(singUpInput: SingUpInput): SingUpResponse | Promise<SingUpResponse>;

    abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(id: string, updateSongInput: UpdateSongInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteSong(id: string): DeleteResult | Promise<DeleteResult>;
}

export class SingUpResponse {
    email: string;
}

export class AccessTokenResponse {
    accessToken: string;
}

export class Validate2FAResponse {
    validate2FA: string;
    message: string;
}

export class Song {
    id: string;
    title?: Nullable<string>;
}

export class UpdateResult {
    affected: number;
}

export class DeleteResult {
    affected: number;
}

export type LoginResponse = AccessTokenResponse | Validate2FAResponse;
type Nullable<T> = T | null;
