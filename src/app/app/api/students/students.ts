import { Api, getHeaders, services } from './../Api';
// use-fetch-data.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetStudentsData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response: { data: response } } = await Api.get({ service: services.student.students + '?' + query });
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
const useGetStudentData = (params: any = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const { response: { data: response } } = await Api.get({ service: `/students/${params.id}?` + query });
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
const useRegisterStudentData = (): any => {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  const post = async (params: any) => {
    console.log(params);
    debugger
    try {
      const { response: { data: response } } = await Api.post({ service: "students", data: params });
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

export { useGetStudentsData, useGetStudentData, useRegisterStudentData }