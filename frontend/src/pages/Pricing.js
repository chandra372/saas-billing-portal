import React from 'react';

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: 'Starter',
      price: '$29',
      features: ['10,000 API Calls', '10 GB Storage', 'Email Support']
    },
    {
      id: 2,
      name: 'Professional',
      price: '$99',
      features: ['100,000 API Calls', '100 GB Storage', 'Priority Support']
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited API Calls', 'Unlimited Storage', '24/7 Dedicated Support']
    }
  ];

  return (
    <div className="pricing-container">
      <h2>Pricing Plans</h2>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="pricing-card">
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="btn">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
