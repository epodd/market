import Offer from "../../models/offer/offer";

class offerService {
  async createOffer(parent, { data }) {
    const newOffer = await Offer.create({ ...data });
    await newOffer.save();
    return newOffer;
  }

  async getOffers(parent, {}) {
    return null;
  }
}

export default new offerService();
