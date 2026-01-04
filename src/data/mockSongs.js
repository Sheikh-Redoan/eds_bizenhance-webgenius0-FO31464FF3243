export const SONGS = [
  {
    id: "imagine-001",
    title: "Imagine",
    artist: "John Lennon",
    language: "Spanish",
    audioUrl: "/assets/audio/imagine_spanish.mp3",
    coverUrl: "/assets/images/imagine_cover.jpg",
    pages: [
      {
        pageIndex: 0,
        type: "cover",
        content: { image: "/assets/images/imagine_scene.jpg", text: "A timeless classic..." }
      },
      {
        pageIndex: 1,
        type: "lyrics",
        lines: [
          { en: "Shuffle Shuffle Shuffle", target: "Barajar, barajar, barajar", time: 5 },
          { en: "What a deck of cards we've been dealt", target: "Vaya baraja de cartas...", time: 12 },
          { en: "We lay it all down", target: "Lo ponemos todo sobre la mesa", time: 18 },
        ]
      },
      {
        pageIndex: 2,
        type: "vocab",
        words: [
          { word: "Barajar", translation: "Shuffle", context: "Used when mixing cards or things" },
          { word: "Baraja", translation: "Deck", context: "A deck of cards" }
        ]
      }
    ]
  }
];
