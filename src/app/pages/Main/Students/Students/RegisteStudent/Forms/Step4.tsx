import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveData, saveStep } from "../rootSlice";
import { OtherStudentDataForm } from "../../components/OtherStudentDataForm";


export const Step4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const step:any = 4;
  dispatch(saveStep( step ))
  const onSubmit = (data: any) => {
    dispatch(saveData(data));
    navigate("../step5");
  };

  return <OtherStudentDataForm onSubmit={onSubmit} data={{}} />;
};
