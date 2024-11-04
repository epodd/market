import Cart from "../../models/cart/cart";

class cartService {
  getCart(parent, { userId }) {
    return Cart.findOne({ userId });
  }

  async addProductToCart(parent, { userId, products }) {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { products },
      { new: true, returnDocument: "after" }
    );
    if (cart) {
      return cart;
    } else {
      const newCart = await Cart.create({ userId, products });

      await newCart.save();
      return newCart;
    }
  }
}

export default new cartService();
