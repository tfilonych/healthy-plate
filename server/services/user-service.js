const bcrypt = require('bcrypt')
const uuid = require('uuid')
const config = require('config')
const UserModel = require('./../models/User')
const UserDto = require('../dtos/user-dto')
// const mailService = require('../services/mail-service')
const tokenService = require('../services/token-service')

class UserService {
  async registration (userData) {
    const { email, password } = userData;
    const candidate = await UserModel.findOne({email})

    if (candidate) {
      throw new Error(`User with email ${email} has already exist`)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const activationLink = uuid.v4()
    const user = new UserModel({ email, password: hashedPassword, activationLink })

    // await mailService.sendActivationMail(email, `${config.get('apiURL')}/api/auth/activate/${activationLink}`);
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    await user.save()

    return { ...tokens, user: userDto }
  }

  async login (email, password) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('User has not been created yet')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Incorrect password')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens }
  }

  async activate (link) {
    const user = await UserModel.findOne({activationLink: link})

     if (!user) {
       throw new Error('User has not been found')
     }
     user.isActivated = true;
     user.save();

  }

  async logout (refreshToken) {
    return  await tokenService.removeToken(refreshToken)
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw new Error('User is not authorized!')
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDB) {
      throw new Error('User is not authorized!')
    }
    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens }
  }
}

module.exports = new UserService()