
import { apiSlice } from '../apiSlice';


export const authApiSlice: any = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/v1/auth',
                method: 'POST',
                body: { ...credentials },
                headers: {
                    'Accept': 'application/json'
                },
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice