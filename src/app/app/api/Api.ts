import { selectCurrentToken, selectCurrentUser } from './auth/authSlice';
import axios from "axios";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import storage from '../storage';

(() => {
    /*
        const user = useSelector(selectCurrentUser);
        const token = useSelector(selectCurrentToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    */
    axios.defaults.baseURL = "http://localhost:7100/api/v1/";  /*'https://4000-omkurir-server-ul2zrczd9mb.ws-eu54.gitpod.io/api/v2'*///process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.common["apikey"] = process.env.REACT_APP_BASE_API_KEY ?? '';
    axios.defaults.headers.common["withCredentials"] = true;

    axios.interceptors.request.use((config: any) => {
        debugger

        return config;
    });
    // Alter defaults after instance has been created
    //export default Api;

})()

const getHeaders = () => ({
    Authorization: `Bearer ${storage.get('token')}`
})

export const services = {
    common: {
        auth: {
            singIn: 'auth'
        },
        track: "tracks"
    },
    academic: {
        classRoom: "academics/class-rooms",
        shift: "academics/shifts",
        period: "academics/periods",
        class: "academics/class",
    },
    student: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: 'students/enrollments',
        students: 'students'
    }
}

const post = async ({ service, data }: any) => {
    try {
        debugger
        const response = await axios.post(service, data);
        console.log('👉 Returned data:', response);
        toast.success('Registo feito com sucesso');
        return response.data
    } catch (e: any) {
        console.log(`😱 Axios request failed: ${e}`);
        toast.error('Erro: ' + JSON.stringify(e));
        return;
    }
}

const get = async ({ service, id, params }: any) => {
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
        toast.error('Registo feito com sucesso');
        return response.data
    } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
        toast.error('Erro: ' + JSON.stringify(e));
        return;
    }


}

const Api = {
    post, get, put
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
    }, [params])

    return state
}
