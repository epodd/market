import { model, Schema } from "mongoose";

const Product = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productDetail: { type: String, required: true },
  kid: { type: Boolean, required: true },
  price: { type: String, required: true },
  gender: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  color: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  images: [
    {
      key: { type: String, required: true },
      location: { type: String, required: true },
    },
  ],
  typeProduct: [
    {
      type: String,
    },
  ],
  variantsColor: {
    type: [
      {
        id: String,
        color: String,
      },
    ],
    default: [],
  },
});

export default model("Products", Product);
