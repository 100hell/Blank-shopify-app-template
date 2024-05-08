import Helper_getProductsUsingGraphql from "../../helpers/Helper_getProductsUsingGraphql.js";

const _getProducts = async (req, res) => {
  const { edges, pageInfo } = await Helper_getProductsUsingGraphql({
    session: res.locals.shopify.session,
  });
  let products = edges || [];
  //   console.log(pageInfo);
  res.status(200).send(products || {});
};

export default _getProducts;
