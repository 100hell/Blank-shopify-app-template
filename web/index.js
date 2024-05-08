import dotenv from "dotenv";
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import fs from "fs";

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

import cors from "cors";

import connectDB from "./backend/configs/db.js";

import { errorHandler, notFound } from "./backend/middlewares/errorHandlers.js";

// app

import _getStoreDetails from "./backend/controllers/app/_getStoreDetails.js";
import _updateStoreDetails from "./backend/controllers/app/_updateStoreDetails.js";
import _getCollections from "./backend/controllers/app/_getCollections.js";
import _UploadImage from "./backend/controllers/app/_UploadImage.js";
import _getProducts from "./backend/controllers/app/_getProducts.js";
import _getStoreFrontStoreSettingDetails from "./backend/controllers/store-front/_getStoreFrontStoreSettingDetails.js";
import multer from "multer";
import _addNewLabel from "./backend/controllers/app/_addNewLabel.js";
import _getLabelsByShopName from "./backend/controllers/app/_getLabelsByShopName.js";
import _updateLabel from "./backend/controllers/app/_updateLabel.js";
import _deleteLabel from "./backend/controllers/app/_deleteLabel.js";
import Middleware_saveStoreAppID from "./backend/middlewares/Middleware_saveStoreAppID.js";
import _getStoreFrontPaidLabels from "./backend/controllers/store-front/_getStoreFrontPaidLabels.js";
import _getSubscriptionPlans from "./backend/controllers/app/_getSubscriptionPlans.js";
import _createSubscriptionPlan from "./backend/controllers/app/_createSubscriptionPlan.js";
import { _getSubscriptionDetalis } from "./backend/controllers/app/_getSubscriptionDetalis.js";
// store front

dotenv.config({});
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
console.log(process.env.NODE_ENV);

// Connect MongoDB
connectDB();

app.use(cors());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  Middleware_saveStoreAppID, // save store id and domain and app id
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);
app
  .route("/api/store-front/store-details")
  .get(_getStoreFrontStoreSettingDetails);
app.route("/api/store-front/get-paid-labels").get(_getStoreFrontPaidLabels);

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ limit: "10mb" }));

const storage = multer.diskStorage({
  destination: "./frontend/uploads",
  filename: function (req, file, cb) {
    const { userId } = req.body;
    cb(null, `${userId}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.route("/api/store-details").get(_getStoreDetails).post(_updateStoreDetails);

app.route("/api/getCollections").get(_getCollections);
app.route("/api/getProducts").get(_getProducts);
app.route("/api/getSubscriptionPlans").get(_getSubscriptionPlans);
app.route("/api/getLabels:store").get(_getLabelsByShopName);
app.post("/api/uploadImage", upload.single("image"), _UploadImage);
app.post("/api/addnewlabel", _addNewLabel);
app.post("/api/updateLabel", _updateLabel);
app.post("/api/deleteLabel:labelId", _deleteLabel);
app.post("/api/createSubscriptionPlan", _createSubscriptionPlan);
app.get("/api/getSubscriptionPlan:chargeId", _getSubscriptionDetalis);

app.post("/api/deleteImage", function (req, res) {
  const imgurlArr = req.body.imgUrl.split("/");
  const imgName = imgurlArr[imgurlArr.length - 1];

  fs.unlink(`./frontend/uploads/${imgName}`, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("deleted");
    return res.json({ deleted: true });
  });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

// // Used middlewares for error handling
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT);
