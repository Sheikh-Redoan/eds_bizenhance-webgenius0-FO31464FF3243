/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/endpoints/authApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      await login({ 
        email: formData.email, 
        password: formData.password 
      }).unwrap();
      
      console.log("Login successful");
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login error:", error);
      const msg = error?.data?.message || "Invalid email or password. Please try again.";
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

  return (
    <div className="flex items-center justify-center p-4" style={{height: "calc(100vh - 81px)"}}>
      <motion.div
        className="max-w-[676px] w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"
            animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          />
        </div>

        <motion.div
          className="bg-[#522E0C]/90 shadow-2xl rounded-lg p-8  backdrop-blur-sm"
          variants={formVariants}
        >
          {/* Header with animation */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              
            </motion.div>
            
            <h1 className="text-center text-white text-5xl font-normal font-Morriweather leading-[60px] mb-2">
              Login
            </h1>
            <p className="text-center justify-center text-white/80 text-xl font-normal font-Merriweather leading-6">
              Please enter your details to continue your journey
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                error={errors.email}
                icon={<Mail className="text-[#B28769]/50" size={20} />}
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
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  error={errors.password}
                  icon={<Lock className="text-[#B28769]/50" size={20} />}
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
            </motion.div>

            {/* Remember me & Forgot password */}
            <motion.div 
              className="flex justify-between items-center"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-[#B28769] bg-transparent border-[#B28769] rounded focus:ring-[#B28769]"
                />
                <label htmlFor="remember" className="text-white/70 text-sm font-Merriweather">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-[#D4A76A] text-sm font-Merriweather hover:text-yellow-300 transition-colors"
              >
                Forgot password?
              </Link>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <LogIn size={18} />
                    </motion.span>
                    Login to Your Account
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

          {/* Sign Up Link */}
          <motion.p 
            className="text-center text-white/70 text-base font-Merriweather leading-5 mt-8"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-[#D4A76A] hover:text-yellow-300 font-bold underline transition-colors group"
            >
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1"
              >
                Sign Up <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.span>
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;