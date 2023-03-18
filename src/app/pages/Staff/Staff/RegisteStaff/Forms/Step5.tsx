import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { AddressDataForm } from "../../../../Common/Person/RegisterFrom/Forms/AddressDataForm";
import { saveAddress } from "../rootSlice";

export const Step5 = ({student}:any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onSubmit = (documents: any) => {
    
    dispatch(saveAddress(documents))
    navigate("../result");
  };

  

  
  return (<AddressDataForm onSubmit={onSubmit} data={student} />)
}