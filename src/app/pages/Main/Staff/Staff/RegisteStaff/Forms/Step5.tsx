import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { AddressDataForm } from "../../../../../Common/Person/RegisterFrom/Forms/AddressDataForm";
import { saveAddress, saveStep } from "../rootSlice";

export const Step5 = ({student}:any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const step:any = 5;
  dispatch(saveStep( step ))
  const onSubmit = (documents: any) => {  
    dispatch(saveAddress(documents))
    navigate("../result");
  };

  

  
  return (<AddressDataForm onSubmit={onSubmit} data={student} />)
}