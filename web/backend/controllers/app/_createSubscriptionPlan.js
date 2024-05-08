import shopify from "../../../shopify.js";

const _createSubscriptionPlan = async (req, res) => {
  const session = res.locals.shopify.session;
  const plan = req.body;

  try {
    const recurring_application_charge =
      new shopify.api.rest.RecurringApplicationCharge({ session: session });
    recurring_application_charge.name = plan.title;
    recurring_application_charge.price = plan.price;
    recurring_application_charge.return_url =
      "https://admin.shopify.com/store/sohel-test-webiators/apps/web-product-labels-pro/subscription";
    recurring_application_charge.trial_days = 5;
    recurring_application_charge.test = true;
    await recurring_application_charge.save({
      update: true,
    });
    res.status(200).send(recurring_application_charge);
    console.log(recurring_application_charge, "------subscription done ------");
  } catch (error) {
    console.log(error, "substion error------");
  }
};

export default _createSubscriptionPlan;
