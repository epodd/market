import Color from "../../models/color/colors";

class colorService {
  async addColor(parent, { data }) {
    const newColor = await Color.create({ name: data.name, color: data.color });

    await newColor.save();

    return newColor;
  }

  deleteColor(parent, { colorId }) {
    return Color.findByIdAndDelete(colorId);
  }

  getColors(parent) {
    return Color.find();
  }
}

export default new colorService();
