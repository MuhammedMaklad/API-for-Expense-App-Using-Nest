import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dtos/signUp.dto';
import { signInDto } from './dtos/signIn.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // TODO: POST Signup
  @Post("SignUp")
  async signUp(@Body() req: signUpDto, @Res() res: Response) {
    const data = await this.authService.signup(req);
    return res.status(HttpStatus.CREATED).json({
      message: "Done"
    })
  }
  // TODO: POST Login
  @Post("SignIn")
  async signIn(@Body() req: signInDto, @Res() res: Response) {
    const msg = await this.authService.signIn(req);
    return res.status(HttpStatus.OK).json({
      message: msg
    })
  }

  // TODO: POST Refresh Token
}
