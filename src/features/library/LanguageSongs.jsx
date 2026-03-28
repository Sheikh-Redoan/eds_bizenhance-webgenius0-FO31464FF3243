/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectCurrentUser } from "../../redux/slices/authSlice";
import { useGetSongsQuery, useGetSongCategoriesQuery } from "../../redux/api/contentApi";
import { useGetUserDashboardQuery } from "../../redux/api/userApi"; // ADDED: Import dashboard API
import { Play, ChevronRight, Music, Filter, Search, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import cardBg from "../../assets/images/cardFreame.png";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";

// Simplified WaveformVisual
const WaveformVisual = ({ isPlaying = false }) => {
  return (
    <div className="flex items-center gap-[1px] sm:gap-[2px] h-6 sm:h-8 w-full opacity-50">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-[1px] sm:w-1 bg-gradient-to-t from-[#D4B483] to-[#8B7355] rounded-full"
          style={{
            height: `${Math.max(15, Math.random() * 100)}%`,
          }}
        />
      ))}
    </div>
  );
};

// Responsive SongCard
const SongCard = ({ song, onClick, index, isLocked }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut",
      }
    }),
    hover: {
      y: -6,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.2,
      }
    }
  };

  const difficultyColor = {
    beginner: "#4CAF50",
    intermediate: "#FF9800",
    advanced: "#F44336"
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative w-full ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={isLocked ? null : onClick}
    >
      {/* LOCKED OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-lg border-[10px] sm:border-[14px] lg:border-[20px] border-transparent">
          <div className="bg-[#3F291B] p-4 rounded-full border-2 border-[#8B7355] shadow-2xl">
            <Lock className="w-8 h-8 text-[#D4B483]" />
          </div>
          <p className="mt-3 text-[#EFEFEF] font-Merriweather font-bold text-sm bg-black/60 px-3 py-1 rounded">
            Members Only
          </p>
        </div>
      )}
      {/* Frame Container */}
      <div
        className="border-[10px] sm:border-[14px] lg:border-[20px] border-[#5d4037] rounded-lg shadow-lg relative overflow-hidden bg-transparent w-full"
        style={{
          borderImage: `url(${cardBg}) 30 round`,
        }}
      >
        {/* Inner Content - Parchment Background */}
        <div className="bg-[#FFF1E0] flex flex-col h-full relative overflow-hidden">
          
          {/* Image Section */}
          <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 w-full shrink-0 overflow-hidden">
            <div className="w-full h-full relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${song.coverColor} opacity-70`} />
              <motion.img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Difficulty Badge */}
            <div 
              className="absolute top-1 sm:top-2 right-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-l-md shadow-md z-10"
              style={{ backgroundColor: difficultyColor[song.difficulty] + "CC" }}
            >
              <span className="text-white text-[8px] xs:text-[9px] sm:text-[10px] font-Merriweather uppercase tracking-wide">
                {song.difficulty}
              </span>
            </div>
            
          </div>

          {/* Details Section */}
          <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 flex flex-col gap-2 sm:gap-3 flex-1">
            {/* Header */}
            <div className="relative z-10">
              <h3 className="text-[#3F291B] text-base sm:text-lg md:text-xl font-Merriweather font-bold truncate">
                {song.title}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
                <Music size={10} smSize={12} className="text-[#8B7355] w-2 h-2 sm:w-3 sm:h-3" />
                <p className="text-[#5D4037] text-xs sm:text-sm font-Merriweather font-medium truncate italic">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="relative z-10 min-h-[32px] sm:min-h-[40px]">
              <p className="text-[#5D4037]/90 text-[9px] xs:text-[10px] sm:text-[11px] font-Merriweather leading-relaxed line-clamp-2">
                {song.description}
              </p>
            </div>

            {/* Footer / Controls */}
            <div className="mt-auto flex flex-col gap-1 sm:gap-2 relative z-10 border-t border-[#8B7355]/30 pt-1 sm:pt-2">
              <div className="flex justify-between items-end">
                <span className="px-1.5 sm:px-2 py-0.5 bg-[#755F48]/10 rounded text-[#755F48] text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  {song.genre}
                </span>
                
                {/* Visualizer */}
                <div className="w-16 sm:w-20">
                  <WaveformVisual />
                </div>
              </div>

              {/* Action Button Area */}
              <div className="flex items-center justify-between w-full mt-0.5 sm:mt-1">
                <Button 
                  className={`py-2 sm:py-3 px-3 sm:px-4 w-full mx-auto group ${isLocked ? 'opacity-50' : ''}`}
                  style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'contain' }}
                >
                  {isLocked ? (
                    <span className="text-[#3F291B] text-[10px] xs:text-xs sm:text-xs font-Merriweather font-bold flex items-center justify-center gap-1">
                      <Lock size={10} className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span className="truncate">Locked</span>
                    </span>
                  ) : (
                    <span className="text-[#3F291B] text-[10px] xs:text-xs sm:text-xs font-Merriweather font-bold group-hover:text-[#8B7355] transition-colors flex items-center justify-center gap-0.5 sm:gap-1">
                      <span className="truncate">Open Song</span>
                      <ChevronRight size={10} smSize={14} className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LanguageSongs = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  
  // ADDED: Fetch the dashboard data cleanly to get the real-time is_premium status.
  // We use `skip` so it only fetches if the user is actually authenticated.
  const { data: dashboardData } = useGetUserDashboardQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Extract the fresh premium status. Fallback to the slice if needed, default to false.
  const isPremium = dashboardData?.data?.user?.is_premium || user?.is_premium || false;

  const { data: songsData, isLoading: songsLoading } = useGetSongsQuery();
  const { data: categoriesData } = useGetSongCategoriesQuery();

  const allSongs = songsData?.data || [];
  const categories = categoriesData?.data || [];

  const genres = categories.map(cat => ({
    value: cat.name,
    label: cat.name
  }));
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const languageName = languageId
    ? languageId.charAt(0).toUpperCase() + languageId.slice(1)
    : "Japanese";

  const difficulties = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Filter function
  useEffect(() => {
    if (!allSongs.length) return;

    const filtered = allSongs.filter((song) => {
      const isCorrectLanguage = !languageId || 
        (song.language?.name?.toLowerCase() === languageId.toLowerCase());

      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDiff = selectedDifficulty 
        ? song.difficult === selectedDifficulty 
        : true;
        
      const matchesGenre = selectedGenre 
        ? song.category?.name === selectedGenre 
        : true;

      return isCorrectLanguage && matchesSearch && matchesDiff && matchesGenre;
    });
    
    const normalizedSongs = filtered.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist?.name || "Unknown",
      description: song.short_description,
      genre: song.category?.name,
      difficulty: song.difficult.toLowerCase(),
      image: song.image,
      coverColor: "from-orange-200/20 to-emerald-200/20",
    }));

    setFilteredSongs(normalizedSongs);
  }, [searchQuery, selectedDifficulty, selectedGenre, allSongs, languageId]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty(null);
    setSelectedGenre(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  return (
    <div 
      className="min-h-[calc(100vh-80px)] w-full py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12"
      style={{
        minHeight: "calc(100vh - 80px)"
      }}
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center w-full px-2"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-OldLondon leading-tight">
          Explore {languageName}
        </h1>
        
        <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-Merriweather max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl leading-snug sm:leading-normal">
          Discover songs and start your language learning journey
        </p>
      </motion.div>

      {/* Filters Bar */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
        {/* Search Component */}
        <div className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96">
          <SearchInput 
          className='max-[640px]:bg-[#E4C395] max-[640px]:shadow-2xl'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs..."
          />
        </div>

        {/* Difficulty Select */}
        <div className="w-full sm:w-40 md:w-48 lg:w-56 xl:w-64">
          <Select 
          className='max-[640px]:bg-[#1C1009] max-[640px]:shadow-2xl'
            placeholder="All Difficulties"
            options={difficulties}
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
          />
        </div>

        {/* Genre Select */}
        <div className="w-full sm:w-40 md:w-48 lg:w-56 xl:w-64">
          <Select 
          className='max-[640px]:bg-[#4F3120] max-[640px]:shadow-2xl'
            placeholder="All Genres"
            options={genres}
            value={selectedGenre}
            onChange={setSelectedGenre}
          />
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedDifficulty || selectedGenre) && (
          <Button
            onClick={clearFilters}
            className="p-1.5 sm:p-2 bg-transparent border border-[#B28769] hover:bg-[#B28769]/20 w-full sm:w-auto justify-center"
            style={{ backgroundImage: `none` }}
          >
            <X size={16} smSize={18} className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 sm:ml-2 text-white text-xs sm:text-sm font-Merriweather sm:block hidden">Clear</span>
          </Button>
        )}
      </div>

      {/* Results Counter */}
      <div className="text-white/60 font-Merriweather text-sm sm:text-base">
        Found {filteredSongs.length} {filteredSongs.length === 1 ? 'song' : 'songs'}
      </div>

      {/* Songs Grid */}
      <motion.div 
        className="w-full max-w-7xl grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center px-2 sm:px-4"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            let isLocked = true;

            // UPDATED: Using the reliable `isPremium` value derived from the dashboard API
            if (!isAuthenticated) {
              // Unregistered: Only the 1st song (index 0) is unlocked
              if (index === 0) isLocked = false;
            } else if (isPremium) {
              // Premium User: All songs unlocked
              isLocked = false;
            } else {
              // Registered Non-Premium: First 2 songs (index 0 and 1) unlocked
              if (index < 2) isLocked = false;
            }
            
            return (
              <div key={song.id} className="w-full max-w-xs sm:max-w-sm lg:max-w-full">
                <SongCard
                  song={song}
                  index={index}
                  isLocked={isLocked}
                  onClick={() => {
                    if (!isLocked) {
                      navigate(`/listen/${song.id}`);
                    } else {
                      if (!isAuthenticated) {
                        navigate('/login');
                      } else {
                        navigate('/membership');
                      }
                    }
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12 md:py-16 px-4">
            <Music size={32} smSize={40} mdSize={48} className="text-white/40 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-white/60 text-lg sm:text-xl md:text-2xl font-Merriweather mb-2">
              No songs found
            </h3>
            <p className="text-white/40 font-Merriweather text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LanguageSongs;