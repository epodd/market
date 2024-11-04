import Filter from "../../models/filter/filter";

class filterService {
  async putFilter(parent, { filter, userId }) {
    const hasFilter = await Filter.findOne({ userId });

    if (!hasFilter) {
      const newFilter = await Filter.create({
        userId,
        filter,
      });

      await newFilter.save();
      return newFilter;
    } else {
      return Filter.findOneAndUpdate(
        { userId },
        { filter },
        { new: true, returnDocument: "after" }
      );
    }
  }

  async getFilterByUserId(parent, { userId }) {
    return Filter.findOne({ userId });
  }
}

export default new filterService();
