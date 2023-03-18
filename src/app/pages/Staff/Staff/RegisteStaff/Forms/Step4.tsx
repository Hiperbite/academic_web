import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveData } from "../rootSlice";
import { OtherStaffDataForm } from "../../components/OtherStaffDataForm";


export const Step4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    dispatch(saveData(data));
    navigate("../step5");
  };

  return <OtherStaffDataForm onSubmit={onSubmit} data={{}} />;
};
