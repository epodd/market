import User from "../../models/auth/auth";
import bcrypt from "bcrypt";
import TokenService from "../token/token-service";
import tokenService from "../token/token-service";
import errorTools from "../../tools/error/error-tools";

class userService {
  async login(parent, { email, password }, { res }) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found!");
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      const { accessToken, refreshToken } = TokenService.generateTokens({
        email,
        id: user._id.toString(),
      });

      await tokenService.saveToken(user._id.toString(), refreshToken);

      if (comparePassword) {
        res.cookie("refresh-token", refreshToken, {
          httpOnly: true,
        });
        res.cookie("access-token", accessToken);

        return {
          user: {
            name: user.name,
            email: user.email,
            id: user._id.toString(),
            role: user.role,
            accessToken,
            refreshToken,
          },
          ok: true,
        };
      } else {
        return errorTools.throwError([
          { path: "login", message: "Wrong password" },
        ]);
      }
    } catch ({ message }) {
      console.log(message);
      return errorTools.throwError([{ path: "login", message }]);
    }
  }

  async refreshToken(parent, args, context) {
    const refreshTokenCookie = context?.req.cookies["refresh-token"];

    if (!refreshTokenCookie) {
      context.res.status(400);
      throw Error("No authorized");
    }

    const user = await tokenService.validateRefreshToken(refreshTokenCookie);

    if (!user) {
      context.res.status(400);
      throw Error("Token invalid or no authorized");
    }

    const tokens = TokenService.generateTokens({
      email: user.email,
      id: user.id,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(parent, { userId }) {
    await tokenService.removeToken(userId);
  }

  async registration(parent, { name, email, password }) {
    try {
      const hasUser = await User.findOne({ email });
      if (hasUser) {
        throw new Error("User already exist");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        role: "user",
        password: hashedPassword,
      });

      const { accessToken, refreshToken } = TokenService.generateTokens({
        email,
        id: newUser._id.toString(),
      });

      await tokenService.saveToken(newUser._id.toString(), refreshToken);

      await newUser.save();

      return {
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser?.role,
          accessToken,
          refreshToken,
        },
        ok: true,
      };
    } catch ({ message }) {
      return errorTools.throwError([{ path: "registration", message }]);
    }
  }

  async setAdmin(parent, { userId }) {
    return User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          role: "admin",
        },
      },
      {
        new: true,
        upsert: true,
        returnDocument: "after",
      }
    );
  }

  async getUser(parent, { userId }) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found!");
      }

      return { user, ok: true };
    } catch ({ message }) {
      return errorTools.throwError([{ path: "getUser", message }]);
    }
  }
}

export default new userService();
