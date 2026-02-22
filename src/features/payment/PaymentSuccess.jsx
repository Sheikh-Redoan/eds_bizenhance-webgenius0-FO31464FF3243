import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";
import { 
  useGetSubscriptionSuccessQuery, 
  usePaypalDonateSuccessMutation 
} from "../../redux/api/paymentApi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get("token");
  const subscription_id = searchParams.get("subscription_id");
  
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Verifying your payment...");

  const isSubscription = Boolean(subscription_id);

  const { data: subData, error: subError } = useGetSubscriptionSuccessQuery(
    { token, subscription_id },
    { skip: !isSubscription || !token } 
  );

  const [verifyDonation] = usePaypalDonateSuccessMutation();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid payment parameters. No token found.");
      return;
    }

    if (isSubscription) {
      if (subData) {
        setStatus("success");
        setMessage("Your subscription has been successfully activated!");
      } else if (subError) {
        setStatus("error");
        setMessage("Failed to verify subscription. Please contact support.");
      }
    } else {
      verifyDonation({ token })
        .unwrap()
        .then(() => {
          setStatus("success");
          setMessage("Thank you! Your donation was successful.");
        })
        .catch(() => {
          setStatus("error");
          setMessage("Failed to verify donation. Please contact support.");
        });
    }
  }, [isSubscription, token, subData, subError, verifyDonation]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#755F48] p-8 rounded-lg border-2 border-[#B28769] max-w-md w-full text-center shadow-2xl"
      >
        {status === "processing" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-yellow-400 animate-spin mb-4" />
            <h2 className="text-2xl font-OldLondon text-white mb-2">Processing Payment</h2>
            <p className="text-white/80 font-Merriweather">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-OldLondon text-white mb-2">Payment Successful!</h2>
            <p className="text-white/90 font-Merriweather mb-8">{message}</p>
            <Button
              className="py-3 px-8 text-orange-100 font-Merriweather w-full"
              style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'cover' }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
              <X className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-OldLondon text-white mb-2">Verification Failed</h2>
            <p className="text-white/90 font-Merriweather mb-8">{message}</p>
            <Button
              className="py-3 px-8 text-orange-100 font-Merriweather w-full"
              style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'cover' }}
              onClick={() => navigate("/membership")}
            >
              Return to Membership
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
