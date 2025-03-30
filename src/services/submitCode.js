import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const submitCodeApi = createApi({
  reducerPath: "submitCodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getSubmittedCode: builder.query({
      query: () => "/submittedCode",
    }),
    submitCode: builder.mutation({
      query: (data) => ({
        url: "/submit-code",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useGetSubmittedCodeQuery, useSubmitCodeMutation } = submitCodeApi