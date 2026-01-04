import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/ButtonBgSecoundary.png";
import profile from "../../assets/images/Ellipse 6.jpg";
import Bronze from "../../assets/images/Bronze.png";
import Silver from "../../assets/images/Silver.png";
import Gold from "../../assets/images/Gold.png";

const Dashboard = () => {
  const userData = {
    name: "Language Learner",
    title: "Level 8 Explorer",
    avatar: profile,
    currentXp: 1250,
    requiredXp: 1500,
    stats: {
      quizzesCompleted: 18,
      badgesEarned: 8,
      songsCompleted: 8,
      achievements: 3,
    },
    weekly: {
      quizzes: 7,
      xp: 630,
      activity: [40, 60, 30, 80, 50, 90, 70],
    },
  };

  const progressPercentage = (userData.currentXp / userData.requiredXp) * 100;

  return (
    <div
      className="max-w-[1200px] mx-auto md:p-8 flex flex-col justify-center gap-10 animate-fade-in"
      style={{ 
        height: "calc(100vh - 81px)",
        animation: "fadeIn 0.6s ease-out"
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progressBar {
          from {
            width: 0%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slide-right {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-scale {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
          animation-fill-mode: both;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .counter-animation {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Top Row: Profile & Weekly Stats */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Profile Card */}
        <div className="flex-grow lg:w-[780px] p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/30 shadow-xl rounded-xl flex flex-col justify-center gap-8 hover-lift animate-slide-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              className="w-20 h-20 rounded-full border-2 border-stone-400 shadow-lg object-cover transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
              src={userData.avatar}
              alt="Profile"
            />
            <div className="flex flex-col items-center sm:items-start gap-2">
              <h1 className="text-white text-4xl font-OldLondon tracking-wide text-shadow-sm">
                {userData.name}
              </h1>
              <div className="text-stone-200 text-xl font-Inter tracking-wide">
                {userData.title}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-end text-white font-Inter">
              <span className="text-lg tracking-wide">
                Progress to level 9
              </span>
              <span className="text-lg font-medium tracking-wide">
                {userData.currentXp} / {userData.requiredXp} XP
              </span>
            </div>
            <div className="w-full h-4 bg-stone-700/50 rounded-full overflow-hidden border border-stone-600/30">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-amber-200 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-500 ease-out"
                style={{ 
                  width: `${progressPercentage}%`,
                  animation: "progressBar 1.5s ease-out"
                }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Stats Card */}
        <div className="flex-1 min-w-[300px] p-6 bg-stone-400/20 backdrop-blur-sm border border-stone-500/30 shadow-xl rounded-xl flex flex-col gap-6 hover-lift animate-slide-right">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-3xl font-OldLondon text-center sm:text-left">
              This Week
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-stone-100 transform transition-transform duration-300 hover:translate-x-2">
                <span className="text-lg">Quizzes</span>
                <span className="text-xl font-bold counter-animation">
                  {userData.weekly.quizzes}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-100 transform transition-transform duration-300 hover:translate-x-2">
                <span className="text-lg">XP Earned</span>
                <span className="text-xl font-bold text-white counter-animation">
                  {userData.weekly.xp}
                </span>
              </div>
            </div>
          </div>

          <Button 
            className="flex justify-center items p-[20px] text-white gap-4 text-center text-base font-normal font-Merriweather leading-5 transform transition-all duration-300 hover:scale-105 active:scale-95" 
            style={{ backgroundImage: `url(${buttonBG})` }}
          >
            Keep it up!
          </Button>
        </div>
      </div>

      {/* Middle Row: Key Stats */}
      <div className="flex flex-col sm:flex-row gap-6 md:gap-14">
        {/* Quizzes Completed */}
        <div className="flex-1 p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-stone-800/40 transition-all duration-300 hover-lift animate-scale animate-delay-200">
          <div className="text-white text-4xl font-bold font-Inter drop-shadow-lg counter-animation">
            {userData.stats.quizzesCompleted}
          </div>
          <div className="text-stone-300 text-xl text-center font-light tracking-wider">
            Quizzes Completed
          </div>
        </div>

        {/* Badges Earned */}
        <div className="flex-1 p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-stone-800/40 transition-all duration-300 hover-lift animate-scale animate-delay-300">
          <div className="text-white text-4xl font-bold font-Inter drop-shadow-lg counter-animation">
            {userData.stats.badgesEarned}
          </div>
          <div className="text-stone-300 text-xl text-center font-light tracking-wider">
            Badges Earned
          </div>
        </div>
      </div>

      {/* Bottom Row: Achievements */}
      <div className="flex flex-col gap-6">
        <h2 className="text-white text-3xl font-Medieval animate-scale">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bronze Listener */}
          <div className="h-44 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-200">
            <img 
              src={Bronze} 
              alt="Bronze Medal" 
              className="transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Bronze Listener
            </div>
          </div>

          {/* Silver Singer */}
          <div className="h-44 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-300">
            <img 
              src={Silver} 
              alt="Silver Medal"
              className="transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Silver Singer
            </div>
          </div>

          {/* Gold Performer */}
          <div className="h-44 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-400">
            <img 
              src={Gold} 
              alt="Gold Medal"
              className="transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Gold Performer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
