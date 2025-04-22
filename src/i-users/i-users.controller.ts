import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IUsersService } from './i-users.service';
import { CreateIUserDto } from './dto/create-i-user.dto';
import { UpdateIUserDto } from './dto/update-i-user.dto';

@Controller('i-users')
export class IUsersController {
  constructor(private readonly iUsersService: IUsersService) {}

  @Post()
  create(@Body() createIUserDto: CreateIUserDto) {
    return this.iUsersService.create(createIUserDto);
  }

  @Get()
  findAll() {
    return this.iUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIUserDto: UpdateIUserDto) {
    return this.iUsersService.update(+id, updateIUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iUsersService.remove(+id);
  }
}
