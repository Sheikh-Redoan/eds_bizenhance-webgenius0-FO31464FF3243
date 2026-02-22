import { usePremiumAccess } from "../../hooks/usePremiumAccess";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Button from "../ui/Button";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";

const PremiumGate = ({ children, message = "This content is only available for premium members" }) => {
  const isPremium = usePremiumAccess();
  const navigate = useNavigate();

  if (!isPremium) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="bg-stone-400/20 backdrop-blur-sm border border-stone-500/30 p-8 rounded-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-2xl font-OldLondon text-white mb-4">Premium Content</h2>
          <p className="text-stone-200 font-Merriweather mb-8">{message}</p>
          <Button
            className="py-3 px-8 text-orange-100 font-Merriweather w-full"
            style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'cover' }}
            onClick={() => navigate("/membership")}
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

export default PremiumGate;
