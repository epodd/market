import Product from "../../models/product/product";
import s3Service from "../s3/s3-service";
import errorTools from "../../tools/error/error-tools";

class productService {
  async getProducts(parent, { filter }) {
    if (filter) {
      const { categoryId, colors } = filter;

      let foundProducts = [];
      const hexColors = colors.map((el) => el.color);

      if (categoryId) {
        foundProducts = await Product.find({
          typeProduct: { $in: [categoryId] },
        });
      }

      if (colors.length && categoryId) {
        foundProducts = foundProducts.filter((el) =>
          colors.find((findEl) => findEl.color === el.color)
        );
      }

      if (colors.length && !categoryId) {
        foundProducts = await Product.find({
          color: hexColors,
        });
      }

      return foundProducts;
    } else {
      const products = await Product.find();
      return products;
    }
  }

  async addProduct(parent, { data }) {
    let imagesArr = [];
    if (data.imageFiles && data.imageFiles.length) {
      try {
        for (const image of data.imageFiles) {
          const file = await image;
          const imageObj = await s3Service.uploadFile(file);
          imagesArr.push(imageObj);
        }
      } catch (error) {
        return errorTools.throwError([
          { path: "addProduct", message: "Something went wrong!" },
        ]);
      }
    }
    const newProduct = await Product.create({ ...data, images: imagesArr });

    if (newProduct?.variantsColor && newProduct.variantsColor.length) {
      const ids = newProduct.variantsColor.map((el) => el.id);
      const productsToLink = await Product.find({
        id: { $in: ids },
      });

      let arrayVariantsColor = [];

      arrayVariantsColor.push({
        id: newProduct._id.toString(),
        color: newProduct.color,
      });

      for (let product of productsToLink) {
        arrayVariantsColor.push({
          id: product._id.toString(),
          color: product.color,
        });
        arrayVariantsColor.push(product.variantsColor);
      }

      arrayVariantsColor = arrayVariantsColor.flat();

      const uniqVariantsColor = arrayVariantsColor.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x && current.color && current.id) {
          return acc.concat([{ id: current.id, color: current.color }]);
        } else {
          return acc;
        }
      }, []);

      const idsToUpdateVariantsColor = uniqVariantsColor.map(
        (el: { id: string; color: string }) => el.id
      );

      for (let id of idsToUpdateVariantsColor) {
        await Product.findByIdAndUpdate(id, {
          variantsColor: uniqVariantsColor,
        });
      }
    }

    return newProduct;
  }

  getProductByName(parent, { name }) {
    return Product.find({ name: { $regex: new RegExp(name, "i") } });
  }

  async getProductByIds(parent, { ids }) {
    const products = await Product.find({ _id: ids });

    return products;
  }

  async getProductByFilter(parent, { filter }) {
    const { categoryId, colors } = filter;
    let foundCategory = [];

    if (categoryId) {
      foundCategory = await Product.find({
        typeProduct: { $in: [categoryId] },
      });
    }

    if (colors.length) {
      foundCategory = foundCategory.filter((el) =>
        colors.find((findEl) => findEl.color === el.color)
      );
    }

    return foundCategory;
  }
}

export default new productService();
