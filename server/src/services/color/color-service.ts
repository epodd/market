import Color from "../../models/color/colors";

class colorService {
  async addColor(parent, { data }) {
    const newColor = await Color.create({ name: data.name, color: data.color });

    await newColor.save();

    return newColor;
  }

  async deleteColor(parent, { colorId }) {
    const res = await Color.findByIdAndDelete(colorId);
    return res
  }

  async getColors() {
    const data = await Color.find({});
    return data
  }
}

export default new colorService();
