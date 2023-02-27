// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetAcademicPeriodsData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  //useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { data: response } = await axios.get('/academics/periods?' + query);
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    //fetchData();
  //}, [params]);

  return {
    fetchData,
    data,
    loading,
  };
};
const useGetAcademicPeriodData = (params: any = {}): any => {
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
const useRegisterAcademicPeriodData = (): any => {
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

export { useGetAcademicPeriodsData, useGetAcademicPeriodData, useRegisterAcademicPeriodData }