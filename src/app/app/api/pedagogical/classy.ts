import { services } from './../Api';
// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from '../Api';

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

    debugger
    try {
      const { response:{data: response }} = await Api.post({service:services.academic.class, data: params});
      setData(response);
      setError({})
    } catch (error:any) {
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

const useRegisterClassRoomData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
    //useEffect(() => {
  const post = async (params: any) => {
    console.log(params);

    debugger
    try {
      const { data: response } = await Api.post({service:services.academic.class, data: params});
      setData(response);
      setError({})
    } catch (error:any) {
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

const useUpdateClassyData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
    
  const put = async (params: any) => {
    debugger
    try {
      const { data: response } = await Api.put({service:"academics/class", data: params});
      setData(response);
      setError({})
      setSuccess(true)
    } catch (error:any) {
      console.error(error)
      setError(error.response)
      setSuccess(false)
    }
    setLoading(false);
  };
  //return fetchData;

  return {
    data,
    loading,
    error,
    put,
    success
  };
};

export { useGetClassysData, useGetClassyData, useRegisterClassyData, useUpdateClassyData, useRegisterClassRoomData }