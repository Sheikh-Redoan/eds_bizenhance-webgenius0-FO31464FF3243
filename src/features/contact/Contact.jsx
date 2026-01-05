/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
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
      
      // Shake animation for error
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
      
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success!
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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

  const formVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-8 flex flex-col items-center"
      style={{ height: "calc(100vh - 81px)" }}
    >
      {/* Success Message */}
      {isSubmitted && (
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
          >
            <div className="text-center">
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <h3 className="text-white text-2xl font-OldLondon mb-2">Message Sent!</h3>
              <p className="text-white/80 font-Merriweather mb-4">
                Thank you for contacting us. We'll get back to you soon!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-center justify-center text-white text-5xl font-normal font-OldLondon leading-[52.80px] mb-4">
            Send Us a Message
          </h2>
          <motion.p 
            className="text-center text-white text-xl font-normal font-Merriweather leading-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A timeless classic about peace and unity
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          method="post"
          className="mt-8"
          variants={formVariants}
        >
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <label className="self-stretch justify-center text-white text-xl font-normal font-Merriweather leading-6">
              Full Name <span className="text-red-400">*</span>
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter your Full Name"
              error={errors.fullName}
            />
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.fullName}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} className="mt-4">
            <label className="self-stretch justify-center text-white text-xl font-normal font-Merriweather leading-6">
              Email Address <span className="text-red-400">*</span>
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter your email"
              type="email"
              error={errors.email}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div variants={itemVariants} className="mt-4">
            <label className="self-stretch justify-center text-white text-xl font-normal font-Merriweather leading-6">
              Phone number <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2"
              placeholder="Phone number"
              type="tel"
              error={errors.phone}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.phone}
              </motion.p>
            )}
          </motion.div>

          {/* Subject */}
          <motion.div variants={itemVariants} className="mt-4">
            <label className="self-stretch justify-center text-white text-xl font-normal font-Merriweather leading-6">
              Subject <span className="text-red-400">*</span>
            </label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter your subject"
              error={errors.subject}
            />
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.subject}
              </motion.p>
            )}
          </motion.div>

          {/* Message - Fixed spelling */}
          <motion.div variants={itemVariants} className="mt-4">
            <label className="self-stretch justify-center text-white text-xl font-normal font-Merriweather leading-6">
              Message <span className="text-red-400">*</span>
              <span className="text-gray-400 text-sm ml-2">
                ({formData.message.length}/500 characters)
              </span>
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2"
              placeholder="Enter your message"
              rows={6}
              maxLength={500}
              error={errors.message}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Error */}
          {errors.submit && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mt-4 p-3 bg-red-400/10 border border-red-400/30 rounded flex items-center gap-2"
            >
              <AlertCircle size={16} />
              {errors.submit}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button
              type="submit"
              className={`py-5 text-center justify-center text-orange-100 text-base font-normal font-Merriweather leading-5 w-full mt-4 flex items-center justify-center gap-2`}
              style={{ backgroundImage: `url(${buttonBG})` }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Message
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Add shake animation to global CSS */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;