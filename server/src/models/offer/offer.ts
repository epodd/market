import { model, Schema } from "mongoose";

const Offer = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  userId: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
});

export default model("Offers", Offer);
