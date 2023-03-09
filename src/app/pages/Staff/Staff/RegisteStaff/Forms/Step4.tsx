import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  saveData, saveRoles } from "../rootSlice";
import { Controls } from "../../../../Components/Controls";

export const Step4 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const roles = useSelector((state:any) => state.roles)
  const { register, handleSubmit } = useForm({defaultValues: {roles}});

  const onSubmit = (data:any) => {
    dispatch(saveRoles(data.roles));
    navigate("../result");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="sauce">Pick Sauce:</label>
        <select id="sauce"  {...register("roles")} multiple>
          {
            [
              'SECRETARY',
              'TEACHER',
              'CORDENATOR',
              'SUPERVISOR'
            ].map((s:any) =><option value={s}>{s}</option> )
          }
        </select>
      </div>
      
      <Controls current={4} total={5} />
    </form>
  );
};