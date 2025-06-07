// components/TermsAndServicesModal.jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

const TermsAndServicesModal = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(!user.isTermsAndServicesAccepted);


  const setTerms = async () => {
    try {
      const hasAcceptedTermsResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/setTerms`,
        { _id: user._id }
      );
      setOpen(false);
    } catch (error) {}
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-600 underline">
          Terms & Conditions
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Terms and Conditions
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Last updated: June 6, 2025
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pt-4 text-sm leading-relaxed text-gray-700"
        >
          <div>
            <h2 className="font-semibold text-lg">1. Introduction</h2>
            <p>
              By using our services, you agree to these terms. Please read them
              carefully.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">2. User Obligations</h2>
            <p>
              You must use our services responsibly and comply with all
              applicable laws.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">3. Data Usage</h2>
            <p>
              We respect your privacy. Please review our Privacy Policy for more
              info.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">4. Termination</h2>
            <p>
              We may suspend or terminate access if you violate our policies.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">5. Changes to Terms</h2>
            <p>
              We may update these terms. Continued use means you accept the
              changes.
            </p>
          </div>
        </motion.div>
        <div className="flex space-x-2">
          <div
            className="px-2 py-1 bg-gray-300 rounded-sm w-fit hover:cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancle
          </div>
          <div
            className="px-2 py-1 bg-blue-500 rounded-sm w-fit hover:cursor-pointer"
            onClick={setTerms}
          >
            Accept
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndServicesModal;
