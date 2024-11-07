import Category from '../../models/category/category'

class categoryService {
  async addCategory(parent, { name }) {
    
    const newCategory = await Category.create({ name });

    await newCategory.save();

    return newCategory;
  }

  async addSubCategory(parent, { idCategory, nameSubCategory }) {
    return await Category.findOneAndUpdate(
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
    )
  }

  async addThingToSubCategory(parent, { idCategory, idSubCategory, nameThing }) {
    return await Category.findOneAndUpdate(
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

  async getCategories() {
    return await Category.find({});
    
  }

  async getCategory(parent, { idCategory }) {
    return await Category.findById(idCategory);
  }

  async deleteSubCategory(parent, { idCategory, idSubCategory }) {
    return await Category.findOneAndUpdate(
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

  async deleteThingFromSubCategory(
    parent,
    { idCategory, idSubCategory, idClotheType }
  ) {
    return await Category.findOneAndUpdate(
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

  async deleteCategory(parent, { idCategory }) {
    console.log(idCategory);
    return await Category.findOneAndDelete({
      _id: idCategory,
    });
  }
}

export default new categoryService();
