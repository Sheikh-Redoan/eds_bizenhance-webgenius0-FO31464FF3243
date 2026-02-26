import { baseApi } from "./baseApi";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: () => "/language",
      providesTags: ["Language"],
    }),
    
    getSongCategories: builder.query({
      query: () => "/song-category",
      providesTags: ["Category"],
    }),

    getSongs: builder.query({
      query: () => "/song",
      providesTags: ["Song"],
    }),

    getSongDetails: builder.query({
      query: (id) => `/song/details/${id}`,
      providesTags: ["SongDetails"],
    }),

    getFunFacts: builder.query({
      query: () => "/fun-fact",
      providesTags: ["FunFact"],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useGetSongCategoriesQuery,
  useGetSongsQuery,
  useGetSongDetailsQuery,
  useGetFunFactsQuery,
} = contentApi;
