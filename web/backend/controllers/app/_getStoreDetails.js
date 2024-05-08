import shopify from "../../../shopify.js";
import Stores from "../../models/storeModel.js";

const _getStoreDetails = async ({ req, res }) => {
  try {
    const store = await Stores.findOne({
      store_domain: res.locals.shopify.session.shop,
    });

    if (store?._doc.activePlanId) {
      const planInfo = await shopify.api.rest.RecurringApplicationCharge.find({
        session: res.locals.shopify.session,
        id: store?._doc.activePlanId,
      });
      if (planInfo.status === "active") {
        res.status(200).send(store?._doc || {});
      } else {
        await Stores.updateOne(
          { _id: store._id },
          { $set: { activePlanId: "", idPaidUser: false } }
        );
        const updatedstore = await Stores.findOne({
          store_domain: res.locals.shopify.session.shop,
        });
        res.status(200).send(updatedstore?._doc || {});
      }
    } else {
      res.status(200).send(store?._doc || {});
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      error: error.message || " store details not found",
    });
  }
};

export default _getStoreDetails;
