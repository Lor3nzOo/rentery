import {Controller, Get, Post, Body, Res, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/username')
  usernameExists(@Body() user) {
    return this.authService.usernameExists(user)
  }

  @Post('/email')
  emailExists(@Body() user) {
    return this.authService.emailExists(user)
  }

  @Post('/register')
  register(@Body() user) {
    return this.authService.register(user)
  }

  @Post('/login')
  login(@Body() user, @Res() res) {
    return this.authService.login(user, res)
  }

  @Get('/session')
  async Session(@Req() req) {
    return this.authService.session(req)
  }
}
