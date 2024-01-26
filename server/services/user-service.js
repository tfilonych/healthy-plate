import bcrypt from 'bcrypt';
// import uuid from 'uuid';
import UserModel from './../models/User';
import UserDto from '../dtos/user-dto';
// import mailService from '../services/mail-service';
import tokenService from '../services/token-service';
import dbConnect from '../db';

class UserService {
  async registration(userData) {
    const { email, password } = userData;
    await dbConnect();
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`User with email ${email} has already exist`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    // const activationLink = uuid.v4();
    // const user = new UserModel({ email, password: hashedPassword, activationLink });
    const user = new UserModel({ email, password: hashedPassword });

    // await mailService.sendActivationMail(email, `${ config.get('apiURL')}/api/auth/activate/${activationLink }`);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    await user.save();

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    await dbConnect();
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('User has not been created yet');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(link) {
    await dbConnect();
    const user = await UserModel.findOne({ activationLink: link });

    if (!user) {
      throw new Error('User has not been found');
    }
    user.isActivated = true;
    user.save();

  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error('User is not authorized!');
    }
    await dbConnect();
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new Error('User is not authorized!');
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user, ...tokens };
  }
}

export default new UserService();