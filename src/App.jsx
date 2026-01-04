import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./features/dashboard/Dashboard";
import LanguageSelect from "./features/library/LanguageSelect";
import BookPlayer from "./features/player/BookPlayer";
import Quiz from "./features/quiz/Quiz";
import Membership from "./features/auth/Membership";
import AudioControls from "./features/player/AudioControls";
import Contact from "./features/contact/Contact";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSong } from "./features/player/playerSlice";
import { SONGS } from "./data/mockSongs";
import main_bg from "./assets/main-bg1.png";
import Home from "./features/home/home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSong(SONGS[0]));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-wood-dark font-sans text-paper-light bg-[#E4C395] bg-cover bg-no-repeat">
      <Navbar />
      <main
        className=" bg-no-repeat bg-center bg-contain min-h-screen pt-20.25"
        style={{ backgroundImage: `url(${main_bg})` }}
      >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/languages" element={<LanguageSelect />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/listen/:songId"
              element={
                <div>
                  <BookPlayer />
                  <div className="mt-8">
                    <AudioControls />
                  </div>
                </div>
              }
            />
            <Route path="/quiz/:songId" element={<Quiz />} />
          </Routes>
      </main>
    </div>
  );
}

export default App;
