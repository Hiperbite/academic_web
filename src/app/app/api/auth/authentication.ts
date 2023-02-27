// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import storage from '../../storage';

const useGetClassysData = (params = {}): any => {
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
const useGetClassyData = (params: any = {}): any => {
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
const useRegisterClassyData = (): any => {
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
  const [loading, setLoading] = useState(true);

  const post = async (params: any, opts?: any) => {
    
    try {
      const data = await axios.post("auth", params);
      const { data: response, status } = data;
      storage.set('token', JSON.stringify(response?.data?.accessToken));
      storage.set('refreshToken', JSON.stringify(response?.data?.refreshToken));
      setData({response, status});
      setError('')
    } catch (error: any) {
      console.error(error)
      setData({});
      setError(error?.response?.data ?? error)
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
const logoutHandlerData=()=>storage.remove('token')
export { useAuthenticationHandlerData, logoutHandlerData }