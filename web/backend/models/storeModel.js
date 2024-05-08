import mongoose from "mongoose";

const storeModel = mongoose.Schema(
  {
    store_domain: {
      type: String,
      required: true,
    },
    app_id: {
      type: String,
      required: true,
    },
    label_text: {
      type: String,
      default: "",
    },
    background_color: {
      type: String,
      default: "",
    },
    background_color_hsb: {
      type: Object,
      default: {
        hue: 200,
        brightness: 1,
        saturation: 0.5,
        alpha: 0.7,
      },
    },
    text_color: {
      type: String,
      default: "",
    },
    text_color_hsb: {
      type: Object,
      default: {
        hue: 200,
        brightness: 1,
        saturation: 0.5,
        alpha: 0.7,
      },
    },
    font_size: {
      type: Number,
      default: "",
    },
    font_family: {
      type: String,
      default: "",
    },
    label_Position: {
      type: String,
      default: "",
    },
    label_Animation: {
      type: String,
      default: "",
    },
    label_Height: {
      type: Number,
      default: "",
    },
    label_Width: {
      type: Number,
      default: "",
    },
    label_type: {
      type: String,
      default: "text-label",
    },
    AllProdFlag: {
      type: Boolean,
      default: false,
    },
    AllCollectionFlag: {
      type: Boolean,
      default: false,
    },
    homePageFlag: {
      type: Boolean,
      default: false,
    },
    Collection_to_display: {
      type: String,
      default: "",
    },
    Products_selected: {
      type: Array,
      default: [],
    },
    label_img: {
      type: String,
      default: "",
    },
    allCollectionsPriority: {
      type: String,
      default: "",
    },
    allProductsPriority: {
      type: String,
      default: "",
    },
    homePagePriority: {
      type: String,
      default: "",
    },
    selectedCollectionPriority: {
      type: String,
      default: "",
    },
    selectedProductsPriority: {
      type: String,
      default: "",
    },
    idPaidUser: {
      type: Boolean,
      default: false,
    },
    activePlanId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Stores = mongoose.model("Store", storeModel);

export default Stores;
