import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from './auth/authSlice'

import _axios from "axios";

import axiosRetry from 'axios-retry'

import { useEffect, useState } from "react";

import storage from '../storage';

const axios =
    (() => {

        const axios = _axios.create()

        axios.defaults.baseURL = 'http://localhost:7100/api/v1/'/**///process.env.REACT_APP_BASE_URL_API;

        axios.defaults.headers.common["apikey"] = "process.env.REACT_APP_BASE_API_KEY ?? '3265'";

        const retryDelay = (retryNumber = 0) => {
            const seconds = Math.pow(2, retryNumber) * 1000;
            const randomMs = 1000 * Math.random();
            return seconds + randomMs;
        };

        /*
         axiosRetry(axios, {
             retries: 2,
             retryDelay,
             // retry on Network Error & 5xx responses
             retryCondition: axiosRetry.isRetryableError,
         });
         */

        return axios;
    })()

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7100/',
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

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result: any = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult: any = await baseQuery('api/v1/refresh', api, extraOptions)
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

export type ServiceType = any;//{ endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }
type ApiParamsType = {
    service: ServiceType,
    params?: any,
    obj?: any,
    id?: string,
}
export const useApi = ({ service, id, obj, params }: ApiParamsType) => {

    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>()
    const { endpoint, method = 'GET' }: any = service;
    const headers = getHeaders()

    const resolver: any = {
        post: async ({ form }: any) => {
            setLoading(true)
            try {
                const { data } = await axios.post(endpoint, form, { headers });
                setData(data)
                setError(null)
            } catch ({ response: { data } }: any) {
                setError(data)
            }
            setLoading(false)
        }, get: async ({ id, params }: any) => {
            setLoading(true)
            let url = endpoint
            if (id) {
                url = `${url}/${id}`
            }

            if (params) {
                const query = new URLSearchParams(params).toString();
                url = `${url}/?${query}`;
            }
            debugger
            try {
                const { data } = await axios.get(url, { headers });
                setData(data)
                setError(null)
            } catch ({ response: { data } }: any) {
                setError(data)
            }
            setLoading(false)
        }, drop: async ({ id }: any) => {
            setLoading(true)
            let url = endpoint
            if (id) {
                url = `${url}/${id}`
            }

            try {
                const response = await axios.delete(url, { headers });
                setData(response)
                setError(null)
            } catch ({ response: { data } }: any) {
                setError(data)
            }
            setLoading(false)
        }, put: async ({ id, form }: any) => {
            debugger
            setLoading(true)
            let url = `${endpoint}/${obj?.id ?? id}`

            try {
                const { data: response } = await axios.put(url, obj, { headers });
                setData(response)
                setError(null)
            } catch ({ response: { data } }: any) {
                setError(data)
            }
            setLoading(false)
        }
    }

    const resolve = resolver[method.toLowerCase()]

    useEffect(() => {
        debugger
        if (method === "GET") {
            resolve({ id, params })
        }
    }, [JSON.stringify(params)])

    return {
        data, loading, error, resolve
    }
}



export const getHeaders = () => {
    const token = storage.get('token');

    let headers: any = {
        "withCredentials": true,
        "Content-type": "application/json",
    }

    headers["Authorization"] = `Bearer ${token}`;
    return headers;
};
