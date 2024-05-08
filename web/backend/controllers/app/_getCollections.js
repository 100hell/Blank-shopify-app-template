import Helper_getCollectionsUsingGraphql from "../../helpers/Helper_getCollectionsUsingGraphql.js";

const _getCollections = async (req, res) => {
  console.log("hit");
  const { edges, pageInfo } = await Helper_getCollectionsUsingGraphql({
    session: res.locals.shopify.session,
  });
  let collections = edges || [];
  res.status(200).send(collections || {});
};

export default _getCollections;
