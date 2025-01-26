// server/src/users/users.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: User) {
    const newUser = await this.usersService.register(user);
    return { success: true, user: newUser };
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.usersService.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    // Normalde burada JWT veya session oluşturup dönebilirsin
    return {
      success: true,
      user,
      token: 'JWT_TOKEN_BURADA', // Örnek
    };
  }

  @Get('me')
  async getProfile() {
    // Normalde request içindeki token’ı decode edip userId ile DB’den user çekersin
    return { id: '123', role: 'admin', username: 'test' };
  }
}
