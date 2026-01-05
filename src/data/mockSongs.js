// src/data/mockSongs.js
export const ENHANCED_SONGS = [
  {
    id: "imagine-001",
    title: "Imagine",
    artist: "John Lennon",
    language: "Spanish",
    // Using a public domain audio file URL (you'll need to replace with actual audio)
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    description: "A timeless classic about peace and unity",
    genre: "Pop",
    difficulty: "beginner",
    quiz: [
      {
        question: "How do you say 'Hello' in French?",
        options: ["Au revoir", "Bonjour", "Merci", "S'il vous plait"],
        correctAnswer: 1
      },
      {
        question: "What does 'Barajar' mean?",
        options: ["To Shuffle", "To Dance", "To Sing", "To Jump"],
        correctAnswer: 0
      },
      {
        question: "Which word means 'Deck'?",
        options: ["Mesa", "Baraja", "Silla", "Casa"],
        correctAnswer: 1
      },
      {
        question: "What is the message of 'Imagine'?",
        options: ["War", "Money", "Peace and Unity", "Fame"],
        correctAnswer: 2
      }
    ],
    pages: [
      {
        pageIndex: 0,
        type: "cover",
        content: {
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=800&fit=crop",
          title: "Imagine",
          artist: "John Lennon",
          description: "A timeless classic about peace and unity"
        }
      },
      {
        pageIndex: 1,
        type: "story",
        content: {
          title: "The Story",
          text: "Written in 1971, 'Imagine' is John Lennon's most famous solo work. The song encourages listeners to imagine a world of peace, without borders, religions, or possessions that divide humanity.",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop"
        }
      },
      {
        pageIndex: 2,
        type: "lyrics",
        lines: [
          { 
            en: "Shuffle Shuffle Shuffle", 
            target: "Barajar, barajar, barajar", 
            time: 5,
            endTime: 10
          },
          { 
            en: "What a deck of cards we've been dealt", 
            target: "Vaya baraja de cartas que nos han tocado", 
            time: 10,
            endTime: 15
          },
          { 
            en: "We lay it all down", 
            target: "Lo ponemos todo sobre la mesa", 
            time: 15,
            endTime: 20
          },
          { 
            en: "Some of us have it good", 
            target: "Algunos la tienen fácil", 
            time: 20,
            endTime: 25
          },
          { 
            en: "Not one of us chose our deck", 
            target: "Nadie eligió sus cartas", 
            time: 25,
            endTime: 30
          },
          { 
            en: "We all have to play the same game", 
            target: "Todos jugamos el mismo juego", 
            time: 30,
            endTime: 35
          }
        ]
      },
      {
        pageIndex: 3,
        type: "lyrics",
        lines: [
          { 
            en: "Not one of us chose our deck", 
            target: "Nadie eligió sus cartas", 
            time: 35,
            endTime: 40
          },
          { 
            en: "We all have to play the same game", 
            target: "Todos jugamos el mismo juego", 
            time: 40,
            endTime: 45
          },
          { 
            en: "Some of us have it good", 
            target: "Algunos la tienen fácil", 
            time: 45,
            endTime: 50
          }
        ]
      },
      {
        pageIndex: 4,
        type: "vocab",
        words: [
          { 
            word: "Barajar", 
            translation: "Shuffle", 
            context: "Used when mixing cards or things randomly" 
          },
          { 
            word: "Baraja", 
            translation: "Deck", 
            context: "A deck of playing cards" 
          },
          { 
            word: "Tocado", 
            translation: "Dealt/Touched", 
            context: "What has been given or assigned to someone" 
          },
          { 
            word: "Mesa", 
            translation: "Table", 
            context: "A flat surface, also used in expressions like 'lay it on the table'" 
          }
        ]
      }
    ]
  },
  {
    id: "besame-mucho-002",
    title: "Bésame Mucho",
    artist: "Consuelo Velázquez",
    language: "Spanish",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    description: "A romantic bolero that has captured hearts worldwide",
    genre: "Bolero",
    difficulty: "intermediate",
    quiz: [
      {
        question: "What does 'Bésame' mean?",
        options: ["Hug me", "Kiss me", "Love me", "Hold me"],
        correctAnswer: 1
      },
      {
        question: "What genre is 'Bésame Mucho'?",
        options: ["Tango", "Bolero", "Salsa", "Flamenco"],
        correctAnswer: 1
      }
    ],
    pages: [
      {
        pageIndex: 0,
        type: "cover",
        content: {
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=800&fit=crop",
          title: "Bésame Mucho",
          artist: "Consuelo Velázquez",
          description: "A romantic bolero that has captured hearts worldwide"
        }
      },
      {
        pageIndex: 1,
        type: "story",
        content: {
          title: "The Story",
          text: "Written in 1940 by Mexican songwriter Consuelo Velázquez, 'Bésame Mucho' has become one of the most famous boleros of all time. Interestingly, Velázquez had never been kissed when she wrote this passionate song.",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop"
        }
      },
      {
        pageIndex: 2,
        type: "lyrics",
        lines: [
          { 
            en: "Kiss me, kiss me a lot", 
            target: "Bésame, bésame mucho", 
            time: 5,
            endTime: 10
          },
          { 
            en: "As if tonight were the last time", 
            target: "Como si fuera esta noche la última vez", 
            time: 10,
            endTime: 16
          },
          { 
            en: "Kiss me, kiss me a lot", 
            target: "Bésame, bésame mucho", 
            time: 16,
            endTime: 21
          }
        ]
      },
      {
        pageIndex: 3,
        type: "vocab",
        words: [
          { 
            word: "Bésame", 
            translation: "Kiss me", 
            context: "Imperative form of 'besar' (to kiss)" 
          },
          { 
            word: "Mucho", 
            translation: "A lot/Much", 
            context: "Adverb meaning 'very much' or 'a lot'" 
          }
        ]
      }
    ]
  }
];