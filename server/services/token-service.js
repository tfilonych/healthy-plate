const jwt = require('jsonwebtoken')
const config = require('config')
const TokenModel = require('../models/Token')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.get('accessTokenSecret'), { expiresIn: '35m' })
    const refreshToken = jwt.sign(payload, config.get('refreshTokenSecret'), { expiresIn: '90m' })

    return { accessToken, refreshToken }
  }

  async saveToken (userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId })

    if (tokenData) {
      tokenData.refreshTokens.push(refreshToken)

      return tokenData.save()
    }

    return await TokenModel.create({ user: userId, refreshTokens: refreshToken })
  }

  async validateAccessToken (token) {
    try {
      return jwt.verify(token, config.get('accessTokenSecret'))
    } catch (e) {
      return null
    }
  }

  async validateRefreshToken (token) {
    try {
      return jwt.verify(token, config.get('refreshTokenSecret'))
    } catch (e) {
      return null
    }
  }

  async findToken (token) {
    try {
      return await TokenModel.findOne({ refreshTokens: token })
    } catch (e) {
      return null
    }
  }

  async removeToken (refreshToken) {
    return await TokenModel.deleteOne({ refreshTokens: refreshToken })
  }
}

module.exports = new TokenService()