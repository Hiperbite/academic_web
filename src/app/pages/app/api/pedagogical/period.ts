import { services } from './../Api';
// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from '../Api';

const useGetPeriodsData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
    const fetchData = async () => {
  //useEffect(() => {
      try {
        
        const { data: response } = await axios.get('/academics/periods?' + query);
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);

    
  //}, [fetchData,params]);
    };

  return {
    fetchData,
    data,
    loading,
  };
};
const useGetPeriodData = (params: any = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { data: response } = await axios.get(`/academics/periods/${params.id}?` + query);
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
const useRegisterPeriodData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
    //useEffect(() => {
  const post = async (params: any) => {
    console.log(params);

    try {
      
      const { data: response } = await axios.post("/academics/periods", params);
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

const useUpdateperiodData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
    
  const put = async (params: any) => {
    debugger
    try {
      const { data: response } = await Api.put({service:services.academic.period, data: params});
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

export { useGetPeriodsData, useGetPeriodData, useRegisterPeriodData, useUpdateperiodData }