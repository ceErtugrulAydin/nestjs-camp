import { UserUpdateDto } from './../../tools/dtos/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { AllExceptionFilter } from 'libs/filters/all-exception.filter';

@Controller('user')
@UseFilters(AllExceptionFilter)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    const updatedUser = await this.userService.update(id, userUpdateDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
