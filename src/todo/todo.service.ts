import { RESTDataSource } from '@apollo/datasource-rest';
import { Injectable } from '@nestjs/common';
import { Todo } from 'src/graphql';

@Injectable()
export class TodoService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }

  getTodos(): Promise<Todo[]> {
    return this.get<Todo[]>('/todos');
  }
}
