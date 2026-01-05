/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, ChevronRight, Music, Filter, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import cardBg from "../../assets/images/cardFreame.png";
import buttonBG from "../../assets/images/Buttonbordersecoundary.png";

// Use placeholder images or local paths
const SONGS_DATA = [
  {
    id: 1,
    title: "Imagine",
    artist: "John Lennon",
    description: "A timeless classic about peace and unity",
    genre: "Pop",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // Using Unsplash placeholder
    coverColor: "from-orange-200/20 to-emerald-200/20",
  },
  {
    id: 2,
    title: "Bésame Mucho",
    artist: "Consuelo Velázquez",
    description: "A romantic bolero that has captured hearts worldwide",
    genre: "Bolero",
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=200&fit=crop",
    coverColor: "from-orange-200/20 to-emerald-200/20",
  },
  {
    id: 3,
    title: "La Vie en Rose",
    artist: "Édith Piaf",
    description: "An iconic French love song",
    genre: "Chanson",
    difficulty: "intermediate",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop",
    coverColor: "from-orange-200/20 to-emerald-200/20",
  },
  {
    id: 4,
    title: "Yesterday",
    artist: "The Beatles",
    description: "A nostalgic song about lost love",
    genre: "Pop",
    difficulty: "beginner",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop",
    coverColor: "from-orange-200/20 to-emerald-200/20",
  },
];

// Simplified WaveformVisual without complex animations
const WaveformVisual = ({ isPlaying = false }) => {
  return (
    <div className="flex items-center gap-[2px] h-8 w-full opacity-50">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-[#D4B483] to-[#8B7355] rounded-full"
          style={{
            height: `${Math.max(20, Math.random() * 100)}%`,
          }}
        />
      ))}
    </div>
  );
};

// Simplified SongCard - removing complex animations that might cause issues
const SongCard = ({ song, onClick, index }) => {
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
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
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
      className="relative w-full max-w-[300px] cursor-pointer"
      onClick={onClick}
    >
      {/* Frame Container */}
      <div
        className="border-[20px] border-[#5d4037] rounded-lg shadow-lg relative overflow-hidden bg-transparent"
        style={{
          borderImage: `url(${cardBg}) 30 round`,
        }}
      >
        {/* Inner Content - Parchment Background */}
        <div className="bg-[#FFF1E0] flex flex-col h-full relative overflow-hidden">
          
          {/* Image Section */}
          <div className="relative h-44 w-full shrink-0 overflow-hidden">
            <div className="w-full h-full relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${song.coverColor} opacity-70`} />
              <motion.img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Difficulty Badge */}
            <div 
              className="absolute top-2 right-0 px-3 py-1 rounded-l-md shadow-md z-10"
              style={{ backgroundColor: difficultyColor[song.difficulty] + "CC" }}
            >
              <span className="text-white text-[10px] font-Merriweather uppercase tracking-wide">
                {song.difficulty}
              </span>
            </div>
            
          </div>

          {/* Details Section */}
          <div className="px-4 pb-4 pt-1 flex flex-col gap-3 flex-1">
            {/* Header */}
            <div className="relative z-10">
              <h3 className="text-[#3F291B] text-xl font-Merriweather font-bold truncate">
                {song.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Music size={12} className="text-[#8B7355]" />
                <p className="text-[#5D4037] text-sm font-Merriweather font-medium truncate italic">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="relative z-10 min-h-[40px]">
              <p className="text-[#5D4037]/90 text-[11px] font-Merriweather leading-relaxed line-clamp-2">
                {song.description}
              </p>
            </div>

            {/* Footer / Controls */}
            <div className="mt-auto flex flex-col gap-2 relative z-10 border-t border-[#8B7355]/30 pt-2">
              <div className="flex justify-between items-end">
                <span className="px-2 py-0.5 bg-[#755F48]/10 rounded text-[#755F48] text-[10px] font-bold uppercase tracking-wider">
                  {song.genre}
                </span>
                
                {/* Visualizer */}
                <div className="w-20">
                  <WaveformVisual />
                </div>
              </div>

              {/* Action Button Area */}
              <div className="flex items-center justify-between w-full mt-1">
                <Button 
                  className='py-3 px-4 w-full mx-auto group'
                  style={{ backgroundImage: `url(${buttonBG})` }}
                >
                  <span className="text-[#3F291B] text-xs font-Merriweather font-bold group-hover:text-[#8B7355] transition-colors flex items-center justify-center gap-1">
                    Open Song Page
                    <ChevronRight size={14} />
                  </span>
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
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState(SONGS_DATA);

  const languageName = languageId
    ? languageId.charAt(0).toUpperCase() + languageId.slice(1)
    : "Japanese";

  const difficulties = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const genres = [
    { value: "Pop", label: "Pop" },
    { value: "Bolero", label: "Bolero" },
    { value: "Chanson", label: "Chanson" },
    { value: "Rock", label: "Rock" },
  ];

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

  // Filter function
  useEffect(() => {
    const filtered = SONGS_DATA.filter((song) => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff = selectedDifficulty ? song.difficulty === selectedDifficulty : true;
      const matchesGenre = selectedGenre ? song.genre === selectedGenre : true;
      return matchesSearch && matchesDiff && matchesGenre;
    });
    
    setFilteredSongs(filtered);
  }, [searchQuery, selectedDifficulty, selectedGenre]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty(null);
    setSelectedGenre(null);
  };

  return (
    <div 
      className="min-h-[calc(100vh-80px)] w-full py-12 px-4 md:px-8 flex flex-col items-center gap-12"
      style={{
        minHeight: "calc(100vh - 80px)"
      }}
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center gap-6 text-center"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-white text-5xl md:text-7xl font-OldLondon">
          Explore {languageName}
        </h1>
        
        <p className="text-white/80 text-lg md:text-xl font-Merriweather max-w-2xl">
          Discover songs and start your language learning journey
        </p>
      </motion.div>

      {/* Filters Bar */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Search Component */}
        <div className="w-full md:w-96">
          <SearchInput 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs..."
          />
        </div>

        {/* Difficulty Select */}
        <div className="w-full md:w-64">
          <Select 
            placeholder="All Difficulties"
            options={difficulties}
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
          />
        </div>

        {/* Genre Select */}
        <div className="w-full md:w-64">
          <Select 
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
            className="p-2 bg-transparent border border-[#B28769] hover:bg-[#B28769]/20 "
            style={{ backgroundImage: `none` }}
          >
            <X size={18} className="text-white" />
          </Button>
        )}
      </div>

      {/* Results Counter */}
      <div className="text-white/60 font-Merriweather">
        Found {filteredSongs.length} {filteredSongs.length === 1 ? 'song' : 'songs'}
      </div>

      {/* Songs Grid */}
      <motion.div 
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
              onClick={() => navigate(`/listen/${song.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Music size={48} className="text-white/40 mx-auto mb-4" />
            <h3 className="text-white/60 text-xl font-Merriweather mb-2">
              No songs found
            </h3>
            <p className="text-white/40 font-Merriweather mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={clearFilters}
              className="px-6 py-2 bg-transparent border border-[#B28769] text-white hover:bg-[#B28769]/20"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LanguageSongs;