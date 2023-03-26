import { Api, getHeaders, services } from './../Api';
// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import storage from '../../storage';

const useGetClassesData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data: response } = await axios.get('/academics/class?' + query);
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, [params]);

  return {
    data,
    loading,
  };
};
const useGetClasseData = (params: any = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data: response } = await axios.get(`/students/${params.id}?` + query);
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, [params]);

  return {
    data,
    loading,
  };
};
const useRegisterClasseData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  //useEffect(() => {
  const post = async (params: any) => {
    console.log(params);

    try {

      const { data: response } = await axios.post("academics/class", params);
      setData(response);
      setError({})
    } catch (error: any) {
      console.error(error)
      setError(error.response)
    }
    setLoading(false);
  };
  //return fetchData;
  //}, [params]);

  return {
    data,
    loading,
    error,
    post
  };
};

const useAuthenticationHandlerData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const post = async (params: any, opts?: any) => {
    setLoading(true)
    try {
      const data = await Api.post({
        service: services.common.auth.singIn
        , data: params
      })
      const { data: response, status } = data?.response;
      if (status !== 200) {
        throw new Error(response);
      }
      storage.set('token', response?.accessToken);
      storage.set('refreshToken', response?.refreshToken);
      storage.set('user', response?.user);
      setData({ response, status });
      setError('')
    } catch (error: any) {
      debugger
      console.error(error)
      setData({});
      setError(error.message)
    }
    setLoading(false);
  };
  //return fetchData;
  //}, [params]);

  return {
    data,
    loading,
    error,
    post
  };
};
const useForgotPasswordHandlerData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const post = async (params: any, opts?: any) => {

    try {
      debugger
      const data = await Api.post({
        service: services.common.auth.forgotPassword
        , data: params
      })
      const { data: response, status } = data?.response;
      if (status !== 200) {
        throw new Error(response);
      }
      setData({ response, status });
      setError('')
    } catch (error: any) {
      debugger
      console.error(error)
      setData({});
      setError(error.message)
    }
    setLoading(false);
  };
  //return fetchData;
  //}, [params]);

  return {
    data,
    loading,
    error,
    post
  };
};
const useCheckResetPasswordHandlerData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const get = async (params: any, opts?: any) => {
    const { id, passwordResetCode } = params;
    try {
      debugger
      const data = await Api.get({
        service: `${services.common.auth.resetPassword}/${id}/${passwordResetCode}`
      })
      const { data: response, status } = data?.response;
      setData({ response, status });
      setError('')
    } catch (error: any) {
      debugger
      console.error(error)
      setData({});
      setError(error.message)
    }
    setLoading(false);
  };
  //return fetchData;
  //}, [params]);

  return {
    data,
    loading,
    error,
    get
  };
};
const useResetPasswordHandlerData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const post = async (params: any, opts?: any) => {
    const { id, passwordResetCode } = opts;
    try {
      
      debugger
      const data = await Api.post({
        service: `${services.common.auth.resetPassword}/${id}/${passwordResetCode}`,
        data:params
      })
      const { data: response, status } = data?.response;
      if (status !== 200) {
        throw new Error(response);
      }
      setData({ response, status });
      setError('')
    } catch (error: any) {
      debugger
      console.error(error)
      setData({});
      setError(error.message)
    }
    setLoading(false);
  };
  //return fetchData;
  //}, [params]);

  return {
    data,
    loading,
    error,
    post
  };
};
const logoutHandlerData = () => storage.remove('token')
export { useAuthenticationHandlerData, logoutHandlerData, useForgotPasswordHandlerData, useCheckResetPasswordHandlerData, useResetPasswordHandlerData }