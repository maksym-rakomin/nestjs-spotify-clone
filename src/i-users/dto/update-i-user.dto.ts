import { PartialType } from '@nestjs/swagger';
import { CreateIUserDto } from './create-i-user.dto';

export class UpdateIUserDto extends PartialType(CreateIUserDto) {}
