/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/endpoints/authApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle, Users, UserCheck } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "customer" // customer or artist
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      }).unwrap();
      
      console.log("Registration successful");
      navigate("/login");
      
    } catch (error) {
      console.error("Registration error:", error);
      const msg = error?.data?.message || "Registration failed. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
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

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const userTypeOptions = [
    { id: "customer", label: "Continue as a Customer", icon: Users, description: "Listen, learn, and enjoy music" },
    { id: "artist", label: "Continue as an Artist", icon: UserCheck, description: "Share your music and lyrics" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      height: "calc(100vh - 81px)"
    }}>
      <motion.div
        className="max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"
            animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          />
        </div>

        <motion.div
          className="bg-[#522E0C]/90 shadow-2xl rounded-lg p-8  backdrop-blur-sm"
          variants={formVariants}
        >
          {/* Header with animation */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            
            
            <h1 className="text-center text-white text-5xl font-normal font-Merriweather leading-[60px] mb-2">
              Sign up
            </h1>
            <p className="text-center justify-center text-white/80 text-xl font-normal font-Merriweather leading-6">
              Continue as a Customer
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                icon={<User className="text-[#B28769]/50" size={20} />}
                error={errors.name}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
                icon={<Mail className="text-[#B28769]/50" size={20} />}
                error={errors.email}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
             
              <div className="relative">
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  icon={<Lock className="text-[#B28769]/50" size={20} />}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B28769] hover:text-[#D4A76A] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.password}
                </motion.p>
              )}
              <p className="text-white/50 text-xs mt-2 font-Merriweather">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants}>
              
              <div className="relative">
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={<Lock className="text-[#B28769]/50" size={20} />}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B28769] hover:text-[#D4A76A] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div 
              className="flex items-start gap-2"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-[#B28769] bg-transparent border-[#B28769] rounded focus:ring-[#B28769]"
                required
              />
              <label htmlFor="terms" className="text-white/70 text-sm font-Merriweather">
                I agree to the{" "}
                <Link to="/terms" className="text-[#D4A76A] hover:text-yellow-300 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#D4A76A] hover:text-yellow-300 underline">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-400/10 border border-red-400/30 rounded"
              >
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errors.submit}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="py-5 text-center justify-center text-orange-100 text-base font-normal font-Merriweather leading-5 w-full flex items-center justify-center gap-2 group"
                style={{ backgroundImage: `url(${buttonBG})` }}
                disabled={isLoading || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <motion.span
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserPlus size={18} />
                    </motion.span>
                    Create Guild Account
                  </>
                )}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="flex items-center my-6"
              variants={itemVariants}
            >
              <div className="flex-1 h-px bg-[#B28769]/30"></div>
              <div className="flex-1 h-px bg-[#B28769]/30"></div>
            </motion.div>

            
          </form>

          {/* Login Link */}
          <motion.p 
            className="text-center text-white/70 text-base font-Merriweather leading-5 mt-8"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-[#D4A76A] hover:text-yellow-300 font-bold underline transition-colors group"
            >
              <motion.span
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Sign In
              </motion.span>
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;