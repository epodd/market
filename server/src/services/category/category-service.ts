import Category from "../../models/category/category";

class categoryService {
  async addCategory(parent, { name }) {
    const newCategory = await Category.create({ name });

    await newCategory.save();

    return newCategory;
  }

  addSubCategory(parent, { idCategory, nameSubCategory }) {
    return Category.findOneAndUpdate(
      {
        _id: idCategory,
      },
      {
        $push: {
          subCategory: { name: nameSubCategory, typeClothes: [] },
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
  }

  addThingToSubCategory(parent, { idCategory, idSubCategory, nameThing }) {
    return Category.findOneAndUpdate(
      {
        _id: idCategory,
        "subCategory._id": idSubCategory,
      },
      {
        $push: {
          "subCategory.$.typeClothes": { name: nameThing },
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
  }

  getCategories() {
    return Category.find();
  }

  getCategory(parent, { idCategory }) {
    return Category.findById(idCategory);
  }

  deleteSubCategory(parent, { idCategory, idSubCategory }) {
    return Category.findOneAndUpdate(
      {
        _id: idCategory,
      },
      {
        $pull: {
          subCategory: { _id: idSubCategory },
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
  }

  deleteThingFromSubCategory(
    parent,
    { idCategory, idSubCategory, idClotheType }
  ) {
    return Category.findOneAndUpdate(
      {
        _id: idCategory,
        "subCategory._id": idSubCategory,
      },
      {
        $pull: {
          "subCategory.$.typeClothes": { _id: idClotheType },
        },
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
  }

  deleteCategory(parent, { idCategory }) {
    console.log(idCategory);
    return Category.findOneAndDelete({
      _id: idCategory,
    });
  }
}

export default new categoryService();
