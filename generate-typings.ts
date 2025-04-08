import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
});

// export class Song {
//   id: string;
//   title: string;
// }
//
// export abstract class IQuery {
//   abstract songs():
//     | Nullable<Nullable<Song>[]>
//     | Promise<Nullable<Nullable<Song>[]>>;
// }
//
// type Nullable<T> = T | null;
