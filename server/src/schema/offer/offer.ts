import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import offerService from "../../services/offer/offer-service";

const OfferType = {
  name: { type: GraphQLString },
  id: { type: GraphQLString },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  address: { type: GraphQLString },
  status: { type: GraphQLString },
  phoneNumber: { type: GraphQLString },
  userId: { type: GraphQLString },
  createAt: { type: GraphQLString },
};

const OfferObjectType = new GraphQLObjectType({
  name: "OfferObjectType",
  fields: () => OfferType,
});

const OfferInputType = new GraphQLInputObjectType({
  name: "OfferInputType",
  fields: () => OfferType,
});

export const OfferQueries = {
  getOffers: {
    type: new GraphQLList(OfferObjectType),
    args: {},
    resolve: offerService.getOffers,
  },
};

export const OfferMutations = {
  createOffer: {
    type: OfferObjectType,
    args: { data: { type: OfferInputType } },
    resolve: offerService.createOffer,
  },
};
