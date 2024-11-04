import jwt from "jsonwebtoken";
import TokenModel from "../../models/token/token";

class TokenService {
  generateTokens(payload: { id: string; email: string }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "15h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(accessToken) {
    try {
      const token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
      return token;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const token = await TokenModel.findOne({ refreshToken });

    return token;
  }

  async saveToken(userId, refreshToken) {
    const tokenModel = await TokenModel.findOne({ userId });
    if (tokenModel) {
      tokenModel.refreshToken = refreshToken;
      return tokenModel.save();
    }
    const createToken = new TokenModel({ userId, refreshToken });
    return createToken.save();
  }

  removeToken(userId) {
    return TokenModel.deleteOne({ userId });
  }
}

export default new TokenService();
