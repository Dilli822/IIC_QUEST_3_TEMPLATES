import React from "react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "free",
    title: "Free Plan",
    price: "$0",
    billing: "forever",
    features: ["Basic access", "Limited storage", "Community support"],
  },
  {
    id: "monthly",
    title: "Monthly Plan",
    price: "$9.99",
    billing: "per month",
    features: [
      "Unlimited access",
      "100 GB storage",
      "Priority support",
      "Cancel anytime",
    ],
  },
  {
    id: "yearly",
    title: "Yearly Plan",
    price: "$99.99",
    billing: "per year",
    features: [
      "Unlimited access",
      "1 TB storage",
      "Priority support",
      "2 months free",
    ],
  },
];

function Subscription({ onClose }) {
  const handleSubscribe = (planId) => {
    alert(`Subscribed to ${planId} plan!`);
    onClose();
  };

  const getBorderAndBg = (planId) => {
    switch (planId) {
      case "free":
        return "border-green-500 bg-green-50";
      case "monthly":
        return "border-blue-500 bg-blue-50";
      case "yearly":
        return "border-purple-500 bg-purple-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b">
          <h2 className="text-3xl font-bold text-gray-800">
            Choose Your Subscription
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-3xl font-light"
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`transition-all duration-300 p-8 rounded-2xl shadow-md border-2 flex flex-col text-center cursor-default ${getBorderAndBg(plan.id)}`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                {plan.price}
              </p>
              <p className="text-gray-600 text-sm mb-6">/ {plan.billing}</p>
              <ul className="text-gray-700 text-base space-y-2 list-disc list-inside flex-grow mb-6 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button
                className="w-full mt-auto"
                onClick={() => handleSubscribe(plan.id)}
              >
                {plan.id === "free" ? "Get Started" : "Subscribe"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
