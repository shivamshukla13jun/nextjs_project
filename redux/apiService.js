// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ServiceApi = createApi({
  reducerPath: 'ServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api',
    prepareHeaders: (headers, { getState }) => {
    console.log("state ",getState().user.token)
      const token = getState().user.token;
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
   }),
  
  endpoints: (builder) => ({

    getBanners: builder.query({
      query: (name) => `/banner`,
    }),
    getLists:builder.query({
      query:(name)=>`/lists`

    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    getMovieByid:builder.query({
      query:({_id})=>`/movies/${_id}`

    }),
    getMoviesByGenre: builder.query({
      query: ({genre = "", limit = 12, pageNumber = 1}) =>
        `movies?genre=${genre}&limit=${limit}&page=${pageNumber}`,
    }),
    getMyList: builder.query({
      query: ({isMylistpage=""}) => `mylists?isMylistpage=${isMylistpage}`,
    }),
    addToMyList: builder.mutation({
      query: (id) => ({
        url: 'mylists/add',
        method: 'POST',
        body: { listid: id },
      }),
    }),
    deleteFromMyList: builder.mutation({
      query: (id) => ({
        url: `mylists/delete?listid=${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
