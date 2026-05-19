import React from "react";

const Pricing = () => {

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$29",

      features: [
        "10,000 API Calls",
        "10 GB Storage",
        "Email Support",
      ],
    },

    {
      id: 2,
      name: "Professional",
      price: "$99",

      features: [
        "100,000 API Calls",
        "100 GB Storage",
        "Priority Support",
      ],
    },

    {
      id: 3,
      name: "Enterprise",
      price: "Custom",

      features: [
        "Unlimited API Calls",
        "Unlimited Storage",
        "24/7 Dedicated Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">

      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">

        Pricing Plans

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {
          plans.map((plan) => (

            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition hover:scale-105"
            >

              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">

                {plan.name}

              </h3>

              <p className="text-3xl font-semibold mb-6 text-blue-600 dark:text-blue-400">

                {plan.price}

              </p>

              <ul className="mb-6 space-y-2">

                {
                  plan.features.map(
                    (feature, idx) => (

                      <li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300"
                      >

                        ✓ {feature}

                      </li>
                    )
                  )
                }

              </ul>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">

                Choose Plan

              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Pricing;