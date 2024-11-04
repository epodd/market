import { model, Schema } from "mongoose";

const Color = new Schema({
  name: { type: String },
  color: { type: String },
  createAt: { type: Date, required: true, default: Date.now },
});

export default model("Colors", Color);
