import Label from "../../models/LabelModal.js";

const _getLabelsByShopName = async (req, res) => {
  const { store } = req.params;
  //   console.log(typeof store, "params");
  const labels = await Label.find({
    store_domain: store,
  });

  return res.status(200).json(labels);
};
export default _getLabelsByShopName;
