/* eslint-disable no-unused-vars */
import { Check, Crown, Hourglass } from "lucide-react";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import Input from "../../components/ui/Inout";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock subscription data
const subscriptionPlans = [
  {
    id: "monthly",
    icon: Crown,
    title: "Guild Membership",
    price: "$1.00 per month",
    priceValue: 1,
    description: "Monthly subscription",
    features: [
      "Access to all learning pages",
      "Access to all quiz games",
      "Submit original song lyrics",
      "Submit artwork (covers, badges)",
      "Full voting rights",
      "Early community participation"
    ],
    buttonText: "Join Monthly — $1",
    popular: false,
  },
  {
    id: "lifetime",
    icon: Hourglass,
    title: "Lifetime Member",
    price: "$250",
    priceValue: 250,
    description: "One-time payment",
    features: [
      "Permanent access to everything",
      "Submit lyrics & artwork",
      "Full voting rights forever",
      "Priority feature access",
      "Early access to beta tools",
      "Founding supporter badge"
    ],
    buttonText: "Unlock Lifetime — $250",
    popular: true,
  },
  {
    id: "donation",
    icon: Crown,
    title: "Supporter Donate",
    price: "Custom Amount",
    description: "Support future development, language content, and creative community projects.",
    buttonText: "Donation",
    isDonation: true,
    popular: false,
  }
];

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [donationAmount, setDonationAmount] = useState("25");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock payment processing
  const handleSubscribe = async (planId) => {
    setIsProcessing(true);
    setSelectedPlan(planId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedPlan(null);
    }, 3000);
  };

  const handleDonation = async () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount < 1) {
      alert("Please enter a valid donation amount (minimum $1)");
      return;
    }
    
    setIsProcessing(true);
    setSelectedPlan("donation");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedPlan(null);
      setDonationAmount("25");
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(178, 135, 105, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const featureItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative">
      {/* Success Message Overlay */}
      {paymentSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#755F48] p-8 rounded-lg border-2 border-[#B28769] max-w-md mx-4"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center">
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Check size={40} className="text-white" />
              </motion.div>
              <h3 className="text-white text-2xl font-OldLondon mb-2">Success!</h3>
              <p className="text-white/80 font-Merriweather mb-4">
                {selectedPlan === "donation" 
                  ? `Thank you for your $${donationAmount} donation!` 
                  : "Your subscription has been activated successfully!"}
              </p>
              <p className="text-yellow-200 text-sm">
                You will receive a confirmation email shortly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Popular Badge for Lifetime Plan */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 top-4 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-2 rounded-full font-Merriweather font-bold flex items-center gap-2 shadow-lg">
          <Crown size={16} />
          <span>Most Popular Choice</span>
        </div>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto p-8 flex justify-between items-center gap-2 relative"
        style={{ height: "calc(100vh - 81px)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {subscriptionPlans.map((plan, index) => {
          const IconComponent = plan.icon;
          const isPopular = plan.popular;
          const isDonation = plan.isDonation;

          return (
            <motion.div
              key={plan.id}
              className={`relative border border-[#B28769] w-1/3 h-[700px] p-[24px] flex flex-col items-center justify-center ${isPopular ? 'border-2 border-yellow-400' : ''}`}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              {/* Popular badge */}
              {isPopular && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-Merriweather font-bold"
                  animate={pulseAnimation}
                >
                  RECOMMENDED
                </motion.div>
              )}

              <motion.div
                className={`bg-[#B28769]/20 w-[100px] h-[100px] rounded-full flex justify-center items-center mx-auto mb-[24px] ${isPopular ? 'bg-yellow-500/20' : ''}`}
                variants={iconVariants}
                whileHover="hover"
              >
                <IconComponent className={isPopular ? "text-yellow-300" : "text-white"} size={28} />
              </motion.div>

              <div className="w-full">
                <h3 className="justify-center text-white text-4xl font-normal font-OldLondon text-center max-w-[266px] mx-auto">
                  {plan.title}
                </h3>
                
                <motion.p 
                  className="justify-center text-white/80 text-xl font-bold font-Merriweather mx-auto max-w-[180px] mb-[24px] text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {plan.price}
                  {!isDonation && (
                    <span className="block text-sm font-normal text-yellow-200 mt-1">
                      {plan.description}
                    </span>
                  )}
                </motion.p>

                {isDonation ? (
                  <>
                    <p className="text-center justify-center text-white/80 text-xl font-normal font-Merriweather leading-8 mx-auto max-w-[343px] mb-[24px] mt-[24px]">
                      {plan.description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Input 
                        placeholder="Enter your amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        type="number"
                        min="1"
                      />
                      
                      {/* Quick amount selection */}
                      <div className="flex gap-2 mt-3 justify-center">
                        {[10, 25, 50, 100].map((amount) => (
                          <motion.button
                            key={amount}
                            className={`px-3 py-1 rounded text-sm ${donationAmount === amount.toString() ? 'bg-[#B28769] text-white' : 'bg-[#B28769]/30 text-white/70'}`}
                            onClick={() => setDonationAmount(amount.toString())}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ${amount}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <ul className="flex flex-col justify-center items-start gap-4">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center text-white text-base font-normal font-Merriweather gap-3"
                        variants={featureItemVariants}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.05 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Check className="text-[#b49267]" size={24} />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <motion.div
                  className="mt-[41px]"
                  variants={buttonVariants}
                >
                  <Button
                    className={`py-5 text-center justify-center text-orange-100 text-base font-normal font-Merriweather leading-5 w-full ${isPopular ? 'bg-gradient-to-r from-yellow-600 to-amber-700' : ''}`}
                    style={{ backgroundImage: `url(${buttonBG})`, width: "100%" }}
                    onClick={() => isDonation ? handleDonation() : handleSubscribe(plan.id)}
                    disabled={isProcessing && selectedPlan === plan.id}
                  >
                    {isProcessing && selectedPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </span>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>

                  {/* Price breakdown for lifetime */}
                  {plan.id === "lifetime" && !isProcessing && (
                    <motion.p
                      className="text-center text-yellow-200/70 text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      ≈ ${(250 / (12 * 5)).toFixed(2)} per month (5 years)
                    </motion.p>
                  )}

                  {/* Monthly equivalent for donation */}
                  {plan.id === "donation" && (
                    <motion.p
                      className="text-center text-yellow-200/70 text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      All donations are tax-deductible
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Subtle glow effect for popular plan */}
              {isPopular && (
                <motion.div
                  className="absolute inset-0 rounded border-2 border-yellow-400 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Background decorative elements */}
        <motion.div
          className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            background: "radial-gradient(circle, rgba(178,135,105,0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Membership;