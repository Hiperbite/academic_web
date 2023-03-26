import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveContacts } from "../rootSlice";

import { ContactDataForm } from "../../../../../Common/Person/RegisterFrom/Forms/ContactDataForm";

export const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = ({ contacts }: any) => {
    dispatch(saveContacts(contacts))
    navigate("../step3");
  };

  return (<ContactDataForm onSubmit={onSubmit} data={{}} />)
};