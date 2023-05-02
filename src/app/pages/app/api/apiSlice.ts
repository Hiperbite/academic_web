import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from './auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL_API+'/api/v1/',
    credentials: "same-origin", 
    prepareHeaders: (headers: any, { getState }: any) => {
        const token = getState().auth.token
        headers.set("Authorization", `Bearer ${token}`)
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
            headers.set("Content-Type", "application/json")
            headers.set("Content-Type", "application/json");
        return headers
    }
})

const baseQueryWithReauth = async (args:any, api:any, extraOptions: any) => {
    let result:any = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult:any = await baseQuery('api/v1/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut)
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})