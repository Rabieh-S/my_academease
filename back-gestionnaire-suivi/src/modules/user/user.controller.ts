import { Controller, Get, Param, Post, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { JwtGuard } from '../auth/common/guards/jwt.guard';
import { CurrentUser } from '../auth/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id') id: string,
    @Body() createProfileDto: CreateProfileDto
  ) {
    return this.userService.createUserProfile(id, createProfileDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}
