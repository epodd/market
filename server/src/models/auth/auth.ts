import { Schema, model } from "mongoose";

const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
});

export default model("Users", User);
