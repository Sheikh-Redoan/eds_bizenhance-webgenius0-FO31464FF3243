import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, LoaderCircle } from "lucide-react";
import paypal from "../../assets/paypal.png";
import stripe from "../../assets/Stripe.png";
const PaymentModal = ({ isOpen, onClose, onSelectGateway, isLoading }) => {
  if (!isOpen) return null;

  // Reusable button component for local scope
  const PaymentButton = ({ gateway, label, Icon, colors, onClick }) => {
    const isStripe = gateway === "stripe";
    const isPayPal = gateway === "paypal";

    // Standard base styles
    const baseClasses =
      "relative group flex items-center gap-4 w-full p-5 rounded-xl border transition-all duration-300 ease-out";

    // Gateway-specific styling (assuming light background for buttons now)
    const stripeClasses =
      "bg-white hover:bg-zinc-50 border-zinc-200 hover:border-[#635BFF] hover:shadow-lg hover:shadow-[#635BFF]/10";
    const paypalClasses =
      "bg-white hover:bg-zinc-50 border-zinc-200 hover:border-[#003087] hover:shadow-lg hover:shadow-[#003087]/10";

    const labelClasses = "text-left grow";
    const titleClasses = "font-bold text-zinc-950 text-base block";
    const descClasses = "text-sm text-zinc-600 block";

    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`${baseClasses} ${isStripe ? stripeClasses : paypalClasses} ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {/* Gateway Logo */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border border-zinc-100 bg-white">
          <Icon className={`w-8 h-8 object-contain`} />
        </div>

        {/* Text Area */}
        <div className={labelClasses}>
          <span className={titleClasses}>{label}</span>
          <span className={descClasses}>
            {isStripe
              ? "Credit/Debit Card (Visa, MC, etc.)"
              : "PayPal, Venmo, or Pay Later"}
          </span>
        </div>

        {/* Action Icon / Loading */}
        <div className="flex-shrink-0">
          {isLoading ? (
            <LoaderCircle className="w-5 h-5 text-zinc-400 animate-spin" />
          ) : (
            <CreditCard
              className={`w-5 h-5 text-zinc-400 group-hover:${
                isStripe ? "text-[#635BFF]" : "text-[#0070BA]"
              } transition-colors`}
            />
          )}
        </div>
      </button>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ ease: "circOut", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#3F291B] border-2 border-[#8B7355] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 pb-0 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">
              Select Payment Method
            </h2>
            <p className="text-zinc-400 text-base mb-6">
              How would you like to complete your subscription purchase? Choose
              a secure payment option below.
            </p>
          </div>

          {/* Payment Options */}
          <div className="p-6 bg-zinc-800/50 border-t border-zinc-700/50">
            <div className="flex flex-col gap-4">
              <PaymentButton
                gateway="stripe"
                label="Pay with Stripe"
                Icon={StripeIcon} // Pass the SVG component
                onClick={() => onSelectGateway("stripe")}
              />

              <PaymentButton
                gateway="paypal"
                label="Pay with PayPal"
                Icon={PayPalIcon} // Pass the SVG component
                onClick={() => onSelectGateway("paypal")}
              />
            </div>

            {/* Subtext */}
            <p className="text-xs text-zinc-500 text-center mt-6 px-4">
              Your payment information is encrypted and secure. By proceeding,
              you agree to our terms of service and privacy policy.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Embedded SVG Icons (Stripe and PayPal) ---

const StripeIcon = ({ className }) => (
  <img
    src={stripe}
    alt="Stripe Logo"
    className={className}
  />
);

const PayPalIcon = ({ className }) => (
  <img
    src={paypal}
    alt="PayPal Logo"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  />
);

export default PaymentModal;