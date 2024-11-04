import { model, Schema } from "mongoose";

const Cart = new Schema({
  userId: { type: String, required: true },
  products: [{ type: String, required: true }],
});

export default model("Carts", Cart);
