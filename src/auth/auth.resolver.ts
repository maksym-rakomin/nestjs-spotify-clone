import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginInput, Profile, SingUpInput, SingUpResponse } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLJwtAuthGuard } from './gql-jwt-guard';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation('singup')
  singUpUser(
    @Args('singUpInput')
    singUpInput: SingUpInput,
  ): Promise<SingUpResponse> {
    console.log(111, singUpInput);
    return this.userService.create(singUpInput);
  }

  @Query('login')
  async loginUser(
    @Args('loginInput')
    loginInput: LoginInput,
  ): Promise<any> {
    const result = await this.authService.login(loginInput);

    if ('accessToken' in result) {
      return {
        __typename: 'AccessTokenResponse',
        ...result,
      };
    } else {
      return {
        __typename: 'Validate2FAResponse',
        ...result,
      };
    }
  }

  @Query('profile')
  @UseGuards(GraphQLJwtAuthGuard)
  getProfile(parent, args, contextValue: { req: { user?: Profile } }): Profile {
    if (!contextValue?.req?.user) {
      throw new Error('Unauthorized');
    }

    return contextValue.req.user;
  }
}
