import { model, Schema } from "mongoose";

const Filter = new Schema({
  userId: { type: String, required: true },
  filter: {
    categories: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        order: { type: String, required: true },
      },
    ],
    colors: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
  },
  createAt: { type: Date, required: true, default: Date.now },
});

export default model("Filters", Filter);
