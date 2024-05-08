const _getSubscriptionPlans = async (req, res) => {
  const plans = [
    // {
    //   id: 1,
    //   title: "Free Plan",
    //   price: 0,
    //   description: "This is the basic free subscription plan.",
    //   paidPlan: false,
    // },
    {
      id: 1,
      title: "Premium Plan",
      price: 19.99,
      paidPlan: true,
      description:
        "This is the premium subscription plan with additional features.",
    },
  ];

  res.status(200).send(plans);
};

export default _getSubscriptionPlans;
