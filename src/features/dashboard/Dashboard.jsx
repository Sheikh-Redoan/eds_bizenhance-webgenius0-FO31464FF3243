import Button from "../../components/ui/Button";
import buttonBG from "../../assets/images/ButtonBgSecoundary.png";
import profile from "../../assets/images/Ellipse 6.jpg";
import Bronze from "../../assets/images/Bronze.png";
import Silver from "../../assets/images/Silver.png";
import Gold from "../../assets/images/Gold.png";
import { useGetUserDashboardQuery } from "../../redux/api/userApi";

const Dashboard = () => {
  const { data: dashboardData, isLoading, isError } = useGetUserDashboardQuery();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-white">Failed to load dashboard data.</div>;
  }

  const apiData = dashboardData?.data;
  const user = apiData?.user;
  const requiredXp = 1500;
  const currentXp = apiData?.total_xp || 0;
  
  const userData = {
    name: user?.name || "Language Learner",
    title: user?.role === "User" ? "Explorer" : user?.role,
    avatar: user?.avatar || profile,
    currentXp: currentXp,
    requiredXp: requiredXp,
    stats: {
      quizzesCompleted: apiData?.total_complete_quiz || 0,
      badgesEarned: apiData?.total_badge_earned || 0,
      songsCompleted: 0,
      achievements: apiData?.achievement?.length || 0,
    },
    weekly: {
      quizzes: apiData?.total_this_week_quiz || 0,
      xp: apiData?.total_xp_earned || 0,
      activity: [40, 60, 30, 80, 50, 90, 70],
    },
  };

  const progressPercentage = (userData.currentXp / userData.requiredXp) * 100;

  return (
    <div
      className="max-w-[1200px] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:p-8 flex flex-col justify-center gap-6 sm:gap-8 md:gap-10 animate-fade-in overflow-y-auto"
      style={{ 
        minHeight: "calc(100vh - 81px)",
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

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .mobile-stack {
            flex-direction: column !important;
          }
          
          .mobile-full-width {
            width: 100% !important;
          }
          
          .mobile-center {
            text-align: center !important;
          }
          
          .mobile-p-4 {
            padding: 1rem !important;
          }
          
          .mobile-text-lg {
            font-size: 1.125rem !important;
            line-height: 1.75rem !important;
          }
          
          .mobile-text-xl {
            font-size: 1.25rem !important;
            line-height: 1.75rem !important;
          }
          
          .mobile-text-2xl {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
          
          .mobile-text-3xl {
            font-size: 1.875rem !important;
            line-height: 2.25rem !important;
          }
          
          .mobile-gap-4 {
            gap: 1rem !important;
          }
        }
      `}</style>

      {/* Top Row: Profile & Weekly Stats */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        {/* Profile Card */}
        <div className="flex-grow w-full lg:w-[780px] p-6 sm:p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/30 shadow-xl rounded-xl flex flex-col justify-center gap-6 sm:gap-8 hover-lift animate-slide-left mobile-full-width">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-stone-400 shadow-lg object-cover transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
              src={userData.avatar}
              alt="Profile"
            />
            <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-2 mobile-center">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-OldLondon tracking-wide text-shadow-sm">
                {userData.name}
              </h1>
              <div className="text-stone-200 text-lg sm:text-xl font-Inter tracking-wide">
                {userData.title}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-white font-Inter gap-1 sm:gap-0">
              <span className="text-base sm:text-lg tracking-wide mobile-center sm:text-left">
                Progress to next level
              </span>
              <span className="text-base sm:text-lg font-medium tracking-wide">
                {userData.currentXp} / {userData.requiredXp} XP
              </span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-stone-700/50 rounded-full overflow-hidden border border-stone-600/30">
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
        <div className="w-full lg:flex-1 lg:min-w-[300px] p-4 sm:p-6 bg-stone-400/20 backdrop-blur-sm border border-stone-500/30 shadow-xl rounded-xl flex flex-col gap-4 sm:gap-6 hover-lift animate-slide-right mobile-full-width">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-white text-2xl sm:text-3xl font-OldLondon text-center lg:text-left mobile-center">
              This Week
            </h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex justify-between items-center text-stone-100 transform transition-transform duration-300 hover:translate-x-2">
                <span className="text-base sm:text-lg">Quizzes</span>
                <span className="text-lg sm:text-xl font-bold counter-animation">
                  {userData.weekly.quizzes}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-100 transform transition-transform duration-300 hover:translate-x-2">
                <span className="text-base sm:text-lg">XP Earned</span>
                <span className="text-lg sm:text-xl font-bold text-white counter-animation">
                  {userData.weekly.xp}
                </span>
              </div>
            </div>
          </div>

          <Button 
            className="flex justify-center items p-4 sm:p-[20px] text-white gap-3 sm:gap-4 text-center text-sm sm:text-base font-normal font-Merriweather leading-5 transform transition-all duration-300 hover:scale-105 active:scale-95 w-full" 
            style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'contain', backgroundPosition: 'center' }}
          >
            Keep it up!
          </Button>
        </div>
      </div>

      {/* Middle Row: Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-14">
        {/* Quizzes Completed */}
        <div className="p-6 sm:p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-stone-800/40 transition-all duration-300 hover-lift animate-scale animate-delay-200">
          <div className="text-white text-3xl sm:text-4xl font-bold font-Inter drop-shadow-lg counter-animation">
            {userData.stats.quizzesCompleted}
          </div>
          <div className="text-stone-300 text-lg sm:text-xl text-center font-light tracking-wider">
            Quizzes Completed
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-6 sm:p-8 bg-stone-400/20 backdrop-blur-sm border border-stone-500/50 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-stone-800/40 transition-all duration-300 hover-lift animate-scale animate-delay-300">
          <div className="text-white text-3xl sm:text-4xl font-bold font-Inter drop-shadow-lg counter-animation">
            {userData.stats.badgesEarned}
          </div>
          <div className="text-stone-300 text-lg sm:text-xl text-center font-light tracking-wider">
            Badges Earned
          </div>
        </div>
      </div>

      {/* Bottom Row: Achievements */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <h2 className="text-white text-2xl sm:text-3xl font-Medieval animate-scale mobile-center sm:text-left">
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Bronze Listener */}
          <div className="h-auto min-h-[180px] sm:h-44 p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-3 sm:gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-200">
            <img 
              src={Bronze} 
              alt="Bronze Medal" 
              className="w-16 h-16 sm:w-20 sm:h-20 transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-xl sm:text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Bronze Listener
            </div>
          </div>

          {/* Silver Singer */}
          <div className="h-auto min-h-[180px] sm:h-44 p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-3 sm:gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-300">
            <img 
              src={Silver} 
              alt="Silver Medal"
              className="w-16 h-16 sm:w-20 sm:h-20 transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-xl sm:text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Silver Singer
            </div>
          </div>

          {/* Gold Performer */}
          <div className="h-auto min-h-[180px] sm:h-44 p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col justify-center items-center gap-3 sm:gap-4 hover:transform hover:scale-105 transition-all duration-300 shadow-lg group animate-scale animate-delay-400">
            <img 
              src={Gold} 
              alt="Gold Medal"
              className="w-16 h-16 sm:w-20 sm:h-20 transform transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="text-white text-xl sm:text-2xl font-bold font-Inter tracking-wide text-center group-hover:text-amber-100 transition-colors">
              Gold Performer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;