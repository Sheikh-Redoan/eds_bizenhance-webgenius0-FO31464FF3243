import { Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSong } from "./features/player/playerSlice";
import { ENHANCED_SONGS } from "./data/mockSongs";
import main_bg from "./assets/main-bg1.png";

function App() {
  const dispatch = useDispatch();

  // Initialize with first song
  useEffect(() => {
    dispatch(setSong(ENHANCED_SONGS[0]));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-wood-dark font-sans text-paper-light bg-[#E4C395] bg-cover bg-no-repeat">
      <Navbar />
      <main
        className="bg-no-repeat bg-center bg-contain min-h-screen pt-20.25 max-[1024px]:bg-cover"
        style={{ backgroundImage: `url(${main_bg})` }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/languages" element={<LanguageSelect />} />
          <Route path="/languages/:languageId" element={<LanguageSongs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/listen/:songId" element={<BookPlayer />} />
          
          <Route path="/quiz/:songId" element={<Quiz />} />
          <Route path="/quiz/:songId/results" element={<QuizResults />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;