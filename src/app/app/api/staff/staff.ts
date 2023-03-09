import { Api, getHeaders, services } from '../Api';
// use-fetch-data.js
import { useEffect, useState, useMemo } from 'react';

const useGetStaffsData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);

  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response: { data: response } } = await Api.get({ service: services.staff.staff + '?' + query });
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, [params, query]);

  return {
    data,
    loading,
  };
};
const useGetStaffData = (params: any = {}, opts:any={}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useMemo(() => {
    const fetchData = async () => {
      try {

        const { response: { data: response } } = await Api.get({ service: `/staffs/${params.id}?` + query });
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
const useRegisterStaffData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  const post = async (params: any) => {
    console.log(params);
    debugger
    try {
      const { response: { data: response } } = await Api.post({ service: "staffs", data: params });
      setData(response);
      setError({})
    } catch (error: any) {
      console.error(error)
      setError(error.response)
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    post
  };
};

export { useGetStaffsData, useGetStaffData, useRegisterStaffData }