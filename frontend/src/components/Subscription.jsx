import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  const [selectedPlan, setSelectedPlan] = useState("free");

  const handleSubscribe = () => {
    alert(`Subscribed to ${selectedPlan} plan!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Choose Your Subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <Card
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer flex-1 border ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {plan.price}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      / {plan.billing}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="list-disc list-inside text-gray-700">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                  >
                    {plan.id === "free" ? "Get Started" : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
