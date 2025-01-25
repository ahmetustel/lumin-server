// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() credentials: { username: string; password: string }) {
    return this.usersService.validateUser(
      credentials.username,
      credentials.password,
    );
  }

  // Additional user routes...
}
