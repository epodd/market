import { Schema, model } from "mongoose";

const Token = new Schema({
  userId: { type: String, require: true },
  accessToken: { type: String, require: true },
  refreshToken: { type: String, require: true },
});

export default model("Tokens", Token);
