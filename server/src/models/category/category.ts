import { model, Schema } from "mongoose";

const Category = new Schema({
  name: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
  subCategory: [
    {
      name: { type: String },
      createAt: { type: Date, required: true, default: Date.now },
      typeClothes: [
        {
          name: { type: String },
          createAt: { type: Date, required: true, default: Date.now },
        },
      ],
    },
  ],
});

export default model("Categories", Category);
