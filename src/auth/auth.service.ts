import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { signUpDto } from './dtos/signUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt"
import { signInDto } from './dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/resfresh-token.schema';
import generateRandomId from 'src/utils/generateRandomId';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService) {
  }
  async signup(signupData: signUpDto) {

    const { email, password, name } = signupData;
    // TODO: check if email exist
    const emailInUse = await this.UserModel.findOne({ email: email })

    if (emailInUse) {
      throw new ConflictException("Email already in use")
    }
    // TODO: Hash password  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // TODO: create user document and save in mongodb

    const userModel = await this.UserModel.create({
      name,
      email,
      password: hashedPassword
    });
    return {
      id: userModel._id,
    };
  }

  async signIn(signInData: signInDto) {
    const { email, password } = signInData;
    // TODO: check User
    const user = await this.UserModel.findOne({ email });
    if (user === null)
      throw new UnauthorizedException("Invalid User Credentials");

    // TODO: validate pass
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException("Invalid User Credentials");
    }
    // TODO: generate JWT
    return this.generateUserToken(user._id as string);
  }


  async generateUserToken(userId: string) {
    // TODO: generate access Token
    const accessToken = this.jwtService.sign({ userId }, {
      expiresIn: '1h',
    })
    // TODO: generate refresh token
    const refreshToken = generateRandomId();

    // Calculate expiry date (e.g., 3 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.storeRefreshToken(userId, refreshToken, expiryDate)

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(refreshTokenData: RefreshTokenDto) {
    const { refreshToken } = refreshTokenData;
    // TODO: Check is valid 
    const token = await this.RefreshTokenModel.findOne({ token: refreshToken });
    if (!token)
      throw new UnauthorizedException("Invalid token");

    // TODO: check is expired or not 
    if (Date.now() > token.expiryDate.getTime())
      throw new UnauthorizedException("Invalid token");

    return this.generateUserToken(token.userId.toString());
  }

  async storeRefreshToken(userId: string, token: string, expiryDate: Date) {
    // TODO: store fresh-token in database
    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    )
  }
}
