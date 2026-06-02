import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./redux/slices/authSlice";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./features/dashboard/Dashboard";
import LanguageSelect from "./features/library/LanguageSelect";
import LanguageSongs from "./features/library/LanguageSongs";
import BookPlayer from "./features/player/BookPlayer";
import Quiz from "./features/quiz/Quiz";
import QuizResults from "./features/quiz/QuizResults";
import Membership from "./features/auth/Membership";
import Contact from "./features/contact/Contact";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import Home from "./features/home/home";
import ForgotPassword from "./features/forgotpassword/ForgotPassword";
import PaymentSuccess from "./features/payment/PaymentSuccess";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSong } from "./features/player/playerSlice";
import { ENHANCED_SONGS } from "./data/mockSongs";
import main_bg from "./assets/main-bg1.png";
import MouseEffect from "./components/ui/MouseEffect";
import TutorialOverlay from "./components/ui/TutorialOverlay";
import { startTutorial } from "./redux/slices/tutorialSlice";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(setSong(ENHANCED_SONGS[0]));
  }, [dispatch]);

  useEffect(() => {
    // Listen for authentication to complete before checking local storage
    if (isAuthenticated) {
      const shouldStartTutorial = localStorage.getItem("shouldStartTutorial");
      if (shouldStartTutorial === "true") {
        localStorage.removeItem("shouldStartTutorial");
        // Slight delay ensures the Dashboard route has fully loaded
        setTimeout(() => {
          dispatch(startTutorial());
        }, 600);
      }
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="min-h-screen font-sans text-paper-light relative overflow-hidden">
      
      {/* Background Image - Made Fixed/Sticky */}
      <div 
        className="fixed inset-0 bg-contain bg-center bg-no-repeat z-0 max-[500px]:bg-cover"
        style={{ 
          backgroundImage: `url(${main_bg})`,
          backgroundColor: '#E4C395'
        }}
      ></div>
      
      <MouseEffect />
      <TutorialOverlay />

      {/* Content Wrapper */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="pt-20.25 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/languages" element={<LanguageSelect />} />
            <Route path="/languages/:languageId" element={<LanguageSongs />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />

            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/listen/:songId" element={<BookPlayer />} />
            
            <Route path="/exercise/:songId" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            <Route path="/exercise/:songId/results" element={
              <ProtectedRoute>
                <QuizResults />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;