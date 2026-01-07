/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, KeyRound, RefreshCw } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP input, 3: New password, 4: Success
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef([]);

  // Initialize OTP refs
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 6);
  }, []);

  // Start OTP countdown timer
  const startOtpTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateEmail = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    return newErrors;
  };

  const validateOtp = () => {
    const newErrors = {};
    const otpString = formData.otp.join("");
    
    if (!otpString.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otpString)) {
      newErrors.otp = "OTP must be 6 digits";
    }
    
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({ ...prev, otp: newOtp }));
    
    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    
    const validationErrors = validateEmail();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP sent
      setOtpSent(true);
      startOtpTimer();
      setStep(2);
      setErrors({});
      
      console.log("OTP sent to:", formData.email);
      
    } catch (error) {
      console.error("OTP send error:", error);
      setErrors({ submit: "Failed to send OTP. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    
    const validationErrors = validateOtp();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP verification
      const otpString = formData.otp.join("");
      if (otpString === "123456") { // Mock valid OTP
        setStep(3);
        setErrors({});
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
      
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrors({ submit: "Verification failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e?.preventDefault();
    
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock password reset
      setStep(4);
      setErrors({});
      
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({ submit: "Failed to reset password. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = () => {
    if (otpTimer === 0) {
      startOtpTimer();
      setOtpSent(false);
      handleSendOtp();
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
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

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const stepIndicatorVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Steps configuration
  const steps = [
    { number: 1, title: "Enter Email", icon: Mail },
    { number: 2, title: "Verify OTP", icon: KeyRound },
    { number: 3, title: "New Password", icon: RefreshCw },
    { number: 4, title: "Success", icon: CheckCircle }
  ];

  return (
    <div className="min-h-[calc(100vh-81px)] flex items-center justify-center px-4 py-6 sm:p-4">
      <motion.div
        className="max-w-lg w-full mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-yellow-500/10 blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-amber-500/10 blur-3xl"
            animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          />
        </div>

        <motion.div
          className="bg-[#522E0C]/90 shadow-2xl rounded-lg p-6 sm:p-8 border border-[#B28769] backdrop-blur-sm"
          variants={formVariants}
        >
          {/* Back button */}
          <motion.button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-[#D4A76A] hover:text-yellow-300 transition-colors mb-4 sm:mb-6 group"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            variants={itemVariants}
          >
            <ArrowLeft size={18} sm:size-20 />
            <span className="font-Merriweather text-sm sm:text-base">Back to Login</span>
          </motion.button>

          {/* Header */}
          <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
            <motion.div
              className="inline-block mb-3 sm:mb-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#B28769] to-[#8B5E3C] flex items-center justify-center mx-auto shadow-lg">
                {step === 1 && <Mail className="text-white" size={24} sm:size-32 />}
                {step === 2 && <KeyRound className="text-white" size={24} sm:size-32 />}
                {step === 3 && <RefreshCw className="text-white" size={24} sm:size-32 />}
                {step === 4 && <CheckCircle className="text-white" size={24} sm:size-32 />}
              </div>
            </motion.div>
            
            <h1 className="text-white text-2xl sm:text-3xl font-normal font-Merriweather mb-2">
              {step === 1 && "Reset Your Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Create New Password"}
              {step === 4 && "Password Reset!"}
            </h1>
            <p className="text-white/80 text-base sm:text-xl font-normal font-Merriweather leading-5 sm:leading-6">
              {step === 1 && "Enter your email to receive a reset code"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Create a strong new password for your account"}
              {step === 4 && "Your password has been reset successfully"}
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div 
            className="flex justify-between items-center mb-6 sm:mb-8 relative"
            variants={itemVariants}
          >
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.number}>
                <div className="flex flex-col items-center z-10">
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= stepItem.number
                        ? 'bg-[#D4A76A] text-white'
                        : 'bg-[#B28769]/30 text-white/50'
                    }`}
                    variants={stepIndicatorVariants}
                  >
                    {step > stepItem.number ? (
                      <CheckCircle size={16} sm:size-20 />
                    ) : (
                      <stepItem.icon size={16} sm:size-20 />
                    )}
                  </motion.div>
                  <span className={`text-xs font-Merriweather ${
                    step >= stepItem.number ? 'text-white' : 'text-white/50'
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px mx-1 sm:mx-2 relative -top-4 sm:-top-5">
                    <div className={`h-full ${
                      step > stepItem.number ? 'bg-[#D4A76A]' : 'bg-[#B28769]/30'
                    }`}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email Input */}
            {step === 1 && (
              <motion.form
                key="step1"
                onSubmit={handleSendOtp}
                className="space-y-4 sm:space-y-6"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-[#B28769]" size={18} sm:size-20 />
                    <label className="text-white text-base sm:text-lg font-normal font-Merriweather">
                      Email Address
                    </label>
                  </div>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your registered email"
                    type="email"
                    icon={<Mail className="text-[#B28769]/50" size={18} sm:size-20 />}
                    error={errors.email}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={12} sm:size-14 />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-400/10 border border-red-400/30 rounded"
                  >
                    <p className="text-red-400 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle size={14} sm:size-16 />
                      {errors.submit}
                    </p>
                  </motion.div>
                )}

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full flex items-center justify-center gap-2 group"
                    style={{ 
                      backgroundImage: `url(${buttonBG})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center'
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-sm sm:text-base">Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <Mail size={16} className="sm:size-4" />
                        <span className="text-sm sm:text-base">Send Reset Code</span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <motion.form
                key="step2"
                onSubmit={handleVerifyOtp}
                className="space-y-4 sm:space-y-6"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={itemVariants}>
                  <p className="text-white/80 text-center font-Merriweather text-sm sm:text-base mb-4">
                    We've sent a 6-digit code to <span className="text-[#D4A76A] break-all">{formData.email}</span>
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <KeyRound className="text-[#B28769]" size={18} sm:size-20 />
                    <label className="text-white text-base sm:text-lg font-normal font-Merriweather">
                      Enter OTP
                    </label>
                  </div>
                  
                  {/* OTP Input */}
                  <div className="flex justify-center gap-2 sm:gap-3 mb-4">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => otpRefs.current[index] = el}
                        type="text"
                        maxLength="1"
                        value={formData.otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-xl sm:text-2xl font-bold font-Merriweather bg-[#B28769]/30 border-2 border-[#B49267] rounded-lg text-white focus:border-[#D4A76A] focus:outline-none transition-colors"
                        style={{ opacity: 1 }}
                      />
                    ))}
                  </div>
                  
                  {errors.otp && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-xs sm:text-sm mt-2 flex items-center gap-1 justify-center"
                    >
                      <AlertCircle size={12} sm:size-14 />
                      {errors.otp}
                    </motion.p>
                  )}
                  
                  {/* Resend OTP */}
                  <div className="text-center mt-4">
                    <p className="text-white/60 text-xs sm:text-sm font-Merriweather">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={otpTimer > 0}
                        className={`font-bold ${
                          otpTimer > 0
                            ? 'text-white/30 cursor-not-allowed'
                            : 'text-[#D4A76A] hover:text-yellow-300'
                        }`}
                      >
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                      </button>
                    </p>
                  </div>
                </motion.div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-400/10 border border-red-400/30 rounded"
                  >
                    <p className="text-red-400 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle size={14} sm:size-16 />
                      {errors.submit}
                    </p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:flex-1"
                  >
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full"
                      style={{ 
                        backgroundImage: `url(${buttonBG})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }}
                    >
                      Back
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:flex-1"
                  >
                    <Button
                      type="submit"
                      className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full flex items-center justify-center gap-2 group"
                      style={{ 
                        backgroundImage: `url(${buttonBG})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-sm sm:text-base">Verifying...</span>
                        </>
                      ) : (
                        <>
                          <KeyRound size={16} sm:size-18 />
                          <span className="text-sm sm:text-base">Verify & Continue</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <motion.form
                key="step3"
                onSubmit={handleResetPassword}
                className="space-y-4 sm:space-y-6"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="text-[#B28769]" size={18} sm:size-20 />
                    <label className="text-white text-base sm:text-lg font-normal font-Merriweather">
                      New Password
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Create a strong new password"
                      type={showPassword ? "text" : "password"}
                      icon={<KeyRound className="text-[#B28769]/50" size={18} sm:size-20 />}
                      error={errors.newPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-[#B28769] hover:text-[#D4A76A] transition-colors text-sm sm:text-base"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={12} sm:size-14 />
                      {errors.newPassword}
                    </motion.p>
                  )}
                  <p className="text-white/50 text-xs mt-2 font-Merriweather">
                    Must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-2 mb-2">
                    <KeyRound className="text-[#B28769]" size={18} sm:size-20 />
                    <label className="text-white text-base sm:text-lg font-normal font-Merriweather">
                      Confirm Password
                    </label>
                  </div>
                  <Input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    type="password"
                    icon={<KeyRound className="text-[#B28769]/50" size={18} sm:size-20 />}
                    error={errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1"
                    >
                      <AlertCircle size={12} sm:size-14 />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-400/10 border border-red-400/30 rounded"
                  >
                    <p className="text-red-400 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle size={14} sm:size-16 />
                      {errors.submit}
                    </p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:flex-1"
                  >
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full bg-transparent"
                      style={{ 
                        backgroundImage: `url(${buttonBG})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }}
                    >
                      Back
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:flex-1"
                  >
                    <Button
                      type="submit"
                      className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full flex items-center justify-center gap-2 group"
                      style={{ 
                        backgroundImage: `url(${buttonBG})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-sm sm:text-base">Resetting...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} sm:size-18 />
                          <span className="text-sm sm:text-base">Reset Password</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                className="text-center space-y-4 sm:space-y-6"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={32} sm:size-40 md:size-48 className="text-white" />
                </motion.div>
                
                <h3 className="text-white text-2xl sm:text-3xl font-OldLondon mb-2">Password Reset Successful!</h3>
                <p className="text-white/80 font-Merriweather text-sm sm:text-base mb-4 sm:mb-6">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleBackToLogin}
                    className="py-4 sm:py-5 text-center justify-center text-orange-100 text-sm sm:text-base font-normal font-Merriweather leading-5 w-full flex items-center justify-center gap-2 group"
                    style={{ 
                      backgroundImage: `url(${buttonBG})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center'
                    }}
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2"
                    >
                      <ArrowLeft size={16} sm:size-18 className="rotate-180" />
                      <span className="text-sm sm:text-base">Back to Login</span>
                    </motion.span>
                  </Button>
                </motion.div>
                
                <p className="text-white/60 text-xs sm:text-sm font-Merriweather">
                  Redirecting to login page in <span className="text-[#D4A76A]">5 seconds</span>...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Footer note */}
        <motion.p 
          className="text-center text-white/40 text-xs sm:text-sm font-Merriweather mt-4 sm:mt-6"
          variants={itemVariants}
        >
          Need help?{" "}
          <Link to="/contact" className="text-[#D4A76A] hover:text-yellow-300 underline">
            Contact Support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;