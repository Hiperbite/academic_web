import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveDocuments, saveStep } from "../rootSlice";

import { DocumentDataForm } from "../../../../../Common/Person/RegisterFrom/Forms/DocumentDataForm";

export const Step3 = ({ student }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const step:any = 3;
  dispatch(saveStep( step ))
  const onSubmit = (documents: any) => {
    dispatch(saveDocuments(documents))
    navigate("../step4");
  };


  return (<DocumentDataForm onSubmit={onSubmit} data={student} />)
};