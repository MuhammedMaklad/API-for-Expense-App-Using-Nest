import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dtos/signUp.dto';
import { signInDto } from './dtos/signIn.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // TODO: POST Signup
  @Post("SignUp")
  async signUp(@Body() req: signUpDto, @Res() res: Response) {
    await this.authService.signup(req);
    return res.status(HttpStatus.CREATED).json({
      message: "Done"
    })
  }
  // TODO: POST Login
  @Post("SignIn")
  async signIn(@Body() req: signInDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(req);
    return res.status(HttpStatus.OK).json({
      tokens
    })
  }

  // TODO: POST Refresh Token
  @Post('RefreshToken')
  async refreshToken(@Body() req: RefreshTokenDto, @Res() res: Response) {
    const tokens = await this.authService.refreshToken(req);
    return res.status(HttpStatus.OK).json({
      tokens
    })
  }
}
