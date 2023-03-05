import { selectCurrentToken, selectCurrentUser } from './auth/authSlice';
import axios from "axios";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import storage from '../storage';
export const getHeaders = () => {
    const token = storage.get('token');

    let headers: any = {
        "withCredentials": true,
        "Content-type": "application/json",
    }

    headers["Authorization"] = `Bearer ${token}`;

    return headers;
};
(() => {
    axios.defaults.baseURL = "http://localhost:7100/api/v1/";  /*'https://4000-omkurir-server-ul2zrczd9mb.ws-eu54.gitpod.io/api/v2'*///process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.common["apikey"] = process.env.REACT_APP_BASE_API_KEY ?? '3265';

})()


export const services = {
    common: {
        auth: {
            singIn: 'auth'
        },
        track: "tracks",
        contacts: "/commons/contacts",
        documents: "/commons/documents",
        persons: "/commons/persons",
        address: "/commons/address"
    },
    academic: {
        classRoom: "academics/class-rooms",
        shift: "academics/shifts",
        period: "academics/periods",
        class: "academics/class",

        discipline: "commons/disciplines",
        course: "commons/courses",
        curricularPlan: "commons/curricular-plans",
        curricularPlanItem: "commons/plan-items",

    },
    student: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: 'students/enrollments',
        students: 'students'
    }
}

const post = async ({ service, data }: any) => {
    try {

        const response = await axios.post(service, data, { headers: getHeaders() });
        console.log('👉 Returned data:', response);
        toast.success('Registo feito com sucesso');
        return { response }
    } catch (e: any) {
        console.log(`😱 Axios request failed: ${e}`);
        toast.error('😱 Erro: ' + JSON.stringify(e?.response?.data));
        return e;
    }
}

const get = async ({ service, id, params }: any) => {

    let url = service
    if (id) {
        url = `${url}/${id}`
    }

    if (params) {
        const query = new URLSearchParams(params).toString();
        url = `${url}/?${query}`;


    }

    try {
        const response = await axios.get(url, { headers: getHeaders() });
        console.log('👉 Returned data:', response);
        return { response }
    } catch (e: any) {
        console.log(`😱 Axios request failed: ${e}`);
        toast.error('😱 Erro: ' + JSON.stringify(e?.response?.data));
        return e;
    }
}

const drop = async ({ service, id}: any) => {

    let url = service
    if (id) {
        url = `${url}/${id}`
    }

    try {
        const response = await axios.delete(url, { headers: getHeaders() });
        console.log('👉 Returned data:', response);
        return { response }
    } catch (e: any) {
        console.log(`😱 Axios request failed: ${e}`);
        toast.error('😱 Erro: ' + JSON.stringify(e?.response?.data));
        return e;
    }
}

const put = async ({ service, data }: any) => {

    let url = `${service}/${data?.id}`

    try {
        const response = await axios.put(url, data, { headers: getHeaders() });
        console.log('👉 Returned data:', response);
        return { response }
    } catch (e: any) {
        console.log(`😱 Axios request failed: ${e}`);
        e?.response?.data.forEach((err: any, i: number) => toast.error(`😱 Erro ${i + 1}:  ${err.message}`));
        return e;
    }


}

const Api = {
    post, get, put, drop
}

export { Api }


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

            dispatch({ type: "INIT" })
            try {
                const query = new URLSearchParams(params).toString();
                let result;
                if (method === "POST") {
                    result = await Api.post({ service: `${url}${params ? "?" + query : ''}` })
                } else {
                    result = await Api.get({ service: `${url}${params ? "?" + query : ''}` })
                }
                dispatch({ type: "SUCCESS", payload: result?.response?.data })
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error?.message })
            }
        }

        fetch()
    }, [params])

    return state
}