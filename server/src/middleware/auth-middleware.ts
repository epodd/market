import User from "../models/auth/auth";
import TokenService from "../services/token/token-service";
import { AuthenticationError } from "apollo-server-errors";

const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization || "";
  const refreshToken = req.cookies["refresh-token"];

  if (!token) {
    return next();
  }

  const accessToken = token.split(" ")[1] || "";
  const userFromAccessToken = await TokenService.validateAccessToken(
    accessToken
  );

  if (userFromAccessToken) {
    req.user = await User.findOne({ id: userFromAccessToken?.id });
    return next();
  }

  const userFromRefreshToken = await TokenService.validateRefreshToken(
    refreshToken
  );

  if (userFromRefreshToken) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      TokenService.generateTokens({
        email: userFromRefreshToken.email,
        id: userFromRefreshToken.id,
      });

    await TokenService.saveToken(userFromRefreshToken.id, newRefreshToken);

    req.user = await User.findOne({ id: userFromRefreshToken?.id });

    res.cookie("refresh-token", newRefreshToken, {
      httpOnly: true,
    });
    res.cookie("access-token", newAccessToken);

    return next();
  }

  return next();
};

export default authMiddleware;
