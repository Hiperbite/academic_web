import axios from "axios";
import { useEffect, useReducer } from "react";
export const services = {
    academic: {
        classRoom: "academics/class-rooms",
        shift: "academics/shifts",
        period: "academics/periods",
        class: "academics/class",
    },
    student: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: 'students/enrollments',
        students:'students'
    }
}

const post = async ({ service, data }: any) => {
    try {
        const response = await axios.post(service, data);
        console.log('👉 Returned data:', response);
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
}

const get = async ({ service, id, params }: any) => {
    debugger
    let url = service
    if (id) {
        url = `${url}/${id}`
    }
    if (params) {
        url = `${url}/${params}`;
    }

    try {
        const response = await axios.get(url);
        console.log('👉 Returned data:', response);
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
}
const put = async ({ service, data }: any) => {

    let url = `${service}/${data?.id}`

    try {
        const response = await axios.put(url, data);
        console.log('👉 Returned data:', response);
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
    }
}

const Api = {
    post, get, put
}



export default function useAxiosFetch(url: string, params?: any, method?: string) {
    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action?.type) {
            case 'INIT':
                return { ...state, loading: true, isError: false };
            case 'SUCCESS':
                return { ...state, loading: false, isError: false, data: action.payload };
            case 'ERROR':
                return { ...state, loading: false, isError: true, data: null, error: action?.payload };
            default:
                return { ...state, loading: false, isError: true, data: null, error: action?.payload };
        };
    }, {
        loading: false,
        status: null,
        error: null,
        isError: false,
        data: null,
    })

    useEffect(() => {
        if (!url) {
            return;
        }
        const fetch = async () => {
//debugger
            dispatch({ type: "INIT" })
            try {
                const query = new URLSearchParams(params).toString();
                let result;
                if (method === "POST") {
                    result = await axios.post(`${url}${params ? "?" + query : ''}`)
                } else {
                    result = await axios(`${url}${params ? "?" + query : ''}`)
                }
                dispatch({ type: "SUCCESS", payload: result.data })
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error?.message })
            }
        }

        fetch()
    }, [ params])

    return state
}
//export default Api;