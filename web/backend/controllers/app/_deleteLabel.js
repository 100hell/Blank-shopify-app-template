import Label from "../../models/LabelModal.js";

const _deleteLabel = async (req, res) => {
  //   console.log(req.params, "delte -- ");
  const { labelId } = req.params;
  try {
    const deletedLabel = await Label.findByIdAndDelete(labelId);
    res.status(200).send({ success: true });
  } catch (error) {}
};

export default _deleteLabel;
