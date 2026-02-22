import { useSelector } from "react-redux";
import { selectIsPremium } from "../redux/slices/authSlice";

export const usePremiumAccess = () => {
  const isPremium = useSelector(selectIsPremium);
  return isPremium;
};
