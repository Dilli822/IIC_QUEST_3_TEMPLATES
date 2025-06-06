import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

const steps = ["User Info", "Preferences", "Review"];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preference: "",
    comments: "",
  });

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-8 relative">
        {/* Progress Bar Background */}
        <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-gray-300 z-0" />
        {/* Progress Bar Fill */}
        <div
          className="absolute top-3.5 left-0 h-0.5 bg-blue-600 z-10 transition-all duration-300"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-sm font-medium w-full relative z-20"
          >
            <div
              className={`step-circle ${
                index < step ? "completed" : index === step ? "active" : ""
              }`}
            >
              {index < step ? <CheckCircle className="w-5 h-5" /> : index + 1}
            </div>
            <span className="mt-2">{label}</span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <Input
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          )}
          {step === 1 && (
            <>
              <Input
                placeholder="Your Preference"
                name="preference"
                value={formData.preference}
                onChange={handleChange}
              />
              <Textarea
                placeholder="Any comments?"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />
            </>
          )}
          {step === 2 && (
            <div className="text-sm space-y-2">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Preference:</strong> {formData.preference}
              </p>
              <p>
                <strong>Comments:</strong> {formData.comments}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500"
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
