import Label from "../../models/LabelModal.js";

const _updateLabel = async (req, res) => {
  const { _id } = req.body;
  const newdata = req.body;
  const updatedLabel = await Label.findByIdAndUpdate(_id, newdata, {
    new: true,
  });
  //   console.log(updatedLabel, "updated----");
  res.status(200).json(updatedLabel);
};

export default _updateLabel;
