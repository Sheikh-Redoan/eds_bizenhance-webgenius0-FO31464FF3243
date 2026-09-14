/* eslint-disable no-unused-vars */
import { Check, Crown, HandCoins, Hourglass } from "lucide-react";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import Input from "../../components/ui/Input";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added import
import { useSelector } from "react-redux"; // Added import
import { selectIsAuthenticated } from "../../redux/slices/authSlice"; // Added import
import { useGetPlansQuery, usePaypalDonateMutation, useCreateSubscriptionMutation, useCancelSubscriptionMutation } from "../../redux/api/paymentApi";
import { useGetUserDashboardQuery } from "../../redux/api/userApi";

const Membership = () => {
  const navigate = useNavigate(); // Initialize navigate
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get auth state

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [donationAmount, setDonationAmount] = useState("25");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { data: plansData, isLoading: isLoadingPlans } = useGetPlansQuery();
  const [donate, { isLoading: isDonating }] = usePaypalDonateMutation();
  const [subscribe, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();
  const { data: dashboardData, isLoading: isDashboardLoading } = useGetUserDashboardQuery();
  const [cancelSubscription, { isLoading: isCanceling }] = useCancelSubscriptionMutation();

  const isPremium = dashboardData?.data?.user?.is_premium || false;

  const subscriptionPlans = [
    ...(plansData?.data?.map(plan => ({
      id: plan.id,
      icon: plan.name.toLowerCase().includes('lifetime') ? Hourglass : Crown,
      title: plan.name,
      price: `$${plan.price} ${plan.interval === 'MONTH' ? 'per month' : ''}`,
      priceValue: parseFloat(plan.price),
      description: plan.name.toLowerCase().includes('lifetime') ? "One-time payment" : "Monthly subscription",
      features: plan.plan_features.map(f => f.feature),
      buttonText: plan.name.toLowerCase().includes('lifetime') ? `Unlock Lifetime — $${parseInt(plan.price)}` : `Join Monthly — $${parseInt(plan.price)}`,
      popular: plan.name.toLowerCase().includes('lifetime'),
      isDonation: false,
      type: plan.type
    })) || []),
    {
  id: "donation",
  icon: HandCoins,
  title: "Supporter Donate",
  price: "Custom Amount",
  description: [
    "Make a Contribution",
    "Fund Future, Grow Community, Seed Projects."
  ],
  buttonText: "Donation",
  isDonation: true,
  popular: false,
} 
  ];

  const handleSubscribe = async (plan) => {
    // Auth Check Added
    if (!isAuthenticated) {
      navigate("/login"); 
      return;
    }

    setSelectedPlan(plan.id);
    try {
      const res = await subscribe({ plan_id: plan.id }).unwrap();
      
      console.log("API Subscription Response:", res);
      console.log("Response data object:", res?.data);
      
      const redirectUrl = 
          res?.data?.approval_url || 
          res?.approval_url || 
          res?.data?.data?.approval_url ||
          res?.data?.approve_url;
      
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("No redirect URL found in response. Full object:", res);
        console.error("Data keys:", res?.data ? Object.keys(res.data) : 'No data object');
        alert("Failed to get the payment link. Please check the console for details.");
      }
    } catch (err) {
      console.error("Subscription failed", err);
      alert("Failed to initiate subscription. Please try again.");
    } finally {
      setSelectedPlan(null);
    }
  };

  const handleDonation = async () => {
    // Auth Check Added
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount < 1) {
      alert("Please enter a valid donation amount (minimum $1)");
      return;
    }
    
    setSelectedPlan("donation");
    try {
      const res = await donate({ amount }).unwrap();
      if (res?.data?.approve_url) {
        window.location.href = res.data.approve_url;
      }
    } catch (err) {
      console.error("Donation failed", err);
      alert("Failed to process donation. Please try again.");
    } finally {
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription().unwrap();
      alert(res.message || "Subscription successfully canceled.");
    } catch (err) {
      console.error("Cancellation failed", err);
      alert(err?.data?.message || "Failed to cancel subscription. Please try again.");
    }
  };

  if (isLoadingPlans || isDashboardLoading) {
    return <div className="text-white text-center mt-20">Loading Plans...</div>;
  }

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
    <div className="relative min-h-screen">
      {/* Success Message Overlay */}
      {paymentSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#755F48] p-6 md:p-8 rounded-lg border-2 border-[#B28769] max-w-md w-full mx-auto"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Check size={32} className="text-white md:size-40" />
              </motion.div>
              <h3 className="text-white text-xl md:text-2xl font-OldLondon mb-2">Success!</h3>
              <p className="text-white/80 font-Merriweather mb-4 text-sm md:text-base">
                {selectedPlan === "donation" 
                  ? `Thank you for your $${donationAmount} donation!` 
                  : "Your subscription has been activated successfully!"}
              </p>
              <p className="text-yellow-200 text-xs md:text-sm">
                You will receive a confirmation email shortly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Popular Badge for Lifetime Plan */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 top-4 z-10 hidden lg:block"
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
        className="max-w-6xl mx-auto px-4 py-8 lg:p-8 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-6 lg:gap-2 relative min-h-[calc(100vh-81px)]"
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
              className={`relative border border-[#B28769] w-full lg:w-1/3 max-w-md lg:max-w-none h-auto lg:h-[700px] p-6 lg:p-[24px] flex flex-col items-center justify-center ${
                isPopular ? 'border-2 border-yellow-400' : ''
              }`}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              {/* Mobile Popular badge - only for lifetime plan */}
              {isPopular && (
                <>
                  <motion.div
                    className="lg:hidden absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-Merriweather font-bold"
                    animate={pulseAnimation}
                  >
                    RECOMMENDED
                  </motion.div>
                  <div className="lg:hidden mb-4 text-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-1 rounded-full font-Merriweather font-bold flex items-center justify-center gap-2 text-sm">
                      <Crown size={14} />
                      <span>Most Popular Choice</span>
                    </div>
                  </div>
                </>
              )}

              {/* Desktop Popular badge */}
              {isPopular && (
                <motion.div
                  className="hidden lg:block absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-Merriweather font-bold"
                  animate={pulseAnimation}
                >
                  RECOMMENDED
                </motion.div>
              )}

              <motion.div
                className={`bg-[#B28769]/20 w-20 h-20 lg:w-[100px] lg:h-[100px] rounded-full flex justify-center items-center mx-auto mb-4 lg:mb-[24px] ${
                  isPopular ? 'bg-yellow-500/20' : ''
                }`}
                variants={iconVariants}
                whileHover="hover"
              >
                <IconComponent
                  className={isPopular ? "text-yellow-300" : "text-white"}
                  size={28}
                />
              </motion.div>

              <div className="w-full">
                <h3 className="text-white text-2xl lg:text-4xl font-normal font-OldLondon text-center max-w-[266px] mx-auto">
                  {plan.title}
                </h3>
                
                <motion.p 
                  className="text-yellow-200 text-lg lg:text-md font-bold font-Merriweather mx-auto max-w-[180px] mb-4 lg:mb-[24px] text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {plan.price}
                  {!isDonation && (
                    <span className="block text-xs lg:text-sm font-normal text-yellow-200 mt-1">
                      {plan.description}
                    </span>
                  )}
                </motion.p>

                {isDonation ? (
                  <>
                    <ul className="text-white/80 text-base lg:text-md font-normal font-Merriweather leading-6 lg:leading-8 mx-auto max-w-[343px] mb-4 lg:mb-[24px] mt-4 lg:mt-[24px] list-disc list-inside">
  {plan.description.map((item, idx) => (
    <li key={idx} className="flex items-start text-white text-sm lg:text-base font-normal font-Merriweather gap-3 my-2">
      <Check className="text-[#b49267]" size={20} lg:size={24} />
      <p className="max-w-[180px]" >{item}</p>
    </li>
  ))}
</ul>

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
                        className="text-base lg:text-lg"
                      />
                      
                      {/* Quick amount selection */}
                      <div className="flex flex-wrap gap-2 mt-3 justify-center">
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
                  <ul className="flex flex-col justify-center items-start gap-3 lg:gap-4 mb-6 lg:mb-0">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center text-white text-sm lg:text-base font-normal font-Merriweather gap-3"
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
                          <Check className="text-[#b49267]" size={20} lg:size={24} />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <motion.div
                  className="mt-6 lg:mt-[41px]"
                  variants={buttonVariants}
                >
                  {isPremium && !isDonation ? (
                    <Button
                      className="py-4 lg:py-5 text-center text-white text-sm lg:text-base font-normal font-Merriweather leading-5 w-full  rounded transition-all duration-300"
                      onClick={handleCancelSubscription}
                      disabled={isCanceling}
                    >
                      {isCanceling ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Canceling...
                        </span>
                      ) : (
                        "Cancel Subscription"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={`py-4 lg:py-5 text-center text-orange-100 text-sm lg:text-base font-normal font-Merriweather leading-5 w-full ${
                        isPopular ? 'bg-gradient-to-r from-yellow-600 to-amber-700' : ''
                      }`}
                      style={{ backgroundImage: `url(${buttonBG})`, width: "100%" }}
                      onClick={() => isDonation ? handleDonation() : handleSubscribe(plan)}
                      disabled={(isSubscribing || isDonating) && selectedPlan === plan.id}
                    >
                      {(isSubscribing || isDonating) && selectedPlan === plan.id ? (
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
                  )}

                  {/* Price breakdown for lifetime */}
                  {plan.id === "lifetime" && !(isSubscribing || isDonating) && !isPremium && (
                    <motion.p
                      className="text-center text-yellow-200/70 text-xs lg:text-sm mt-2"
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
                      className="text-center text-yellow-200/70 text-xs lg:text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
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
          className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96"
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