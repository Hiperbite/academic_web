import { Api, getHeaders, services } from './../Api';
// use-fetch-data.js
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const useGetStudentsData = (params = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


//  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    debugger
    const fetchData = async () => {
      setLoading(true)
      try {
        const { response: { data: response } } = await Api.get({ service: services.student.students + '?' , params});
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
const useGetStudentData = (params: any = {}, opts: any = {}): any => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(params);


  const query = new URLSearchParams(params).toString();
  useMemo(() => {
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
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const post = async (params: any) => {
    console.log(params);
    debugger
    try {
      const { response: { data: response, status } } = await Api.post({ service: "students", data: params });
      if (status !== 200)
        throw response;
      setData(response);
      setError([])
    } catch (error: any) {
      console.error(error)
      setError(error)
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