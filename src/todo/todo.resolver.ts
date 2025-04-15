import { Context, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  @Query('todos')
  getTodos(@Context('dataSources') dataSources: { todoAPI: TodoService }) {
    return dataSources.todoAPI.getTodos();
  }
}
