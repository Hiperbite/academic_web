import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  saveData } from "../rootSlice";
import { Controls } from "../../../../../Components/Controls";

export const Step4 = ({student}:any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sauce = useSelector((state:any) => state.sauce)
  const { register, handleSubmit } = useForm({defaultValues: {sauce}});

  const onSubmit = (data:any) => {
    //dispatch(saveData(data.sauce));
    navigate("../step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="sauce">Pick Sauce:</label>
        <select id="sauce"  {...register("sauce")}>
          <option value="no_sauce">No Sauce</option>
          <option value="tomato">Tomato</option>
          <option value="spicy_tomato">Spicy Tomato</option>
        </select>
      </div>
      
      <Controls current={4} total={6} />
    </form>
  );
};